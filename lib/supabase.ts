import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.');
}

// Add debug logging
console.log('Initializing Supabase client with URL:', supabaseUrl ? 'URL is set' : 'URL is missing');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for repository data

// Get or create a repository entry
export async function getOrCreateRepository(owner: string, repo: string) {
  try {
    console.log(`Getting or creating repository: ${owner}/${repo}`);
    
    // First, try to find the repository
    const { data: existingRepos, error: findError } = await supabase
      .from('repositories')
      .select('id')
      .eq('owner', owner)
      .eq('repo', repo);

    if (findError) {
      console.error('Error finding repository:', findError);
      throw findError;
    }
    
    if (existingRepos && existingRepos.length > 0) {
      console.log('Found existing repository:', existingRepos[0]);
      return existingRepos[0];
    }
    
    console.log('Repository not found, creating new one');

    // Otherwise, create a new repository entry
    const { data: newRepo, error: insertError } = await supabase
      .from('repositories')
      .insert({ owner, repo })
      .select('id');

    if (insertError) {
      console.error('Error creating repository:', insertError);
      throw insertError;
    }
    
    if (!newRepo || newRepo.length === 0) {
      throw new Error('Failed to create repository: no data returned');
    }

    console.log('Created new repository:', newRepo[0]);
    return newRepo[0];
  } catch (error) {
    console.error('Error in getOrCreateRepository:', error);
    throw error;
  }
}

// Store a diagram for a repository
export async function storeDiagram(repositoryId: number, diagramContent: string) {
  try {
    console.log(`Storing diagram for repository ID: ${repositoryId}`);
    
    // Check if a diagram already exists for this repository
    const { data: existingDiagrams, error: findError } = await supabase
      .from('diagrams')
      .select('id')
      .eq('repository_id', repositoryId);
    
    if (findError) {
      console.error('Error checking for existing diagram:', findError);
      throw findError;
    }
    
    if (existingDiagrams && existingDiagrams.length > 0) {
      console.log(`Updating existing diagram for repository ID: ${repositoryId}`);
      // Update existing diagram
      const { error: updateError } = await supabase
        .from('diagrams')
        .update({ 
          diagram_content: diagramContent,
          created_at: new Date().toISOString()
        })
        .eq('id', existingDiagrams[0].id);
      
      if (updateError) {
        console.error('Error updating diagram:', updateError);
        throw updateError;
      }
      
      console.log('Diagram updated successfully');
    } else {
      console.log(`Creating new diagram for repository ID: ${repositoryId}`);
      // Create new diagram
      const { error: insertError } = await supabase
        .from('diagrams')
        .insert({ 
          repository_id: repositoryId, 
          diagram_content: diagramContent 
        });
      
      if (insertError) {
        console.error('Error creating diagram:', insertError);
        throw insertError;
      }
      
      console.log('Diagram created successfully');
    }
  } catch (error) {
    console.error('Error in storeDiagram:', error);
    throw error;
  }
}

// Get a stored diagram for a repository
export async function getDiagram(owner: string, repo: string): Promise<string | null> {
  try {
    console.log(`Getting diagram for repository: ${owner}/${repo}`);
    
    // First, get the repository ID
    const { data: repository, error: repoError } = await supabase
      .from('repositories')
      .select('id')
      .eq('owner', owner)
      .eq('repo', repo)
      .single();
    
    if (repoError) {
      if (repoError.code === 'PGRST116') {
        console.log(`No repository found for ${owner}/${repo}`);
        return null;
      }
      console.error('Error finding repository:', repoError);
      throw repoError;
    }
    
    console.log(`Found repository ID: ${repository.id}`);
    
    // Get the diagram
    const { data: diagrams, error: diagramError } = await supabase
      .from('diagrams')
      .select('diagram_content')
      .eq('repository_id', repository.id);
    
    if (diagramError) {
      console.error('Error finding diagram:', diagramError);
      throw diagramError;
    }
    
    if (!diagrams || diagrams.length === 0) {
      console.log(`No diagram found for repository ID: ${repository.id}`);
      return null;
    }
    
    console.log(`Found diagram for repository ID: ${repository.id}`);
    return diagrams[0].diagram_content;
  } catch (error) {
    console.error('Error in getDiagram:', error);
    return null;
  }
}

// Store features and their walkthroughs
export async function storeFeatures(
  repositoryId: number, 
  features: Array<{
    title: string;
    description: string;
    matches: number;
    walkthrough?: {
      title: string;
      description: string;
      steps: Array<{
        title: string;
        description: string;
        files: string[];
        code: string;
        explanation: string;
      }>;
    };
    error?: string;
  }>
) {
  try {
    console.log(`Storing features for repository ID: ${repositoryId}`);
    console.log(`Total features to store: ${features.length}`);
    console.log(`Features with walkthroughs: ${features.filter(f => f.walkthrough).length}`);
    
    // First, delete all existing features for this repository to avoid duplicates
    const { error: deleteError } = await supabase
      .from('features')
      .delete()
      .eq('repository_id', repositoryId);

    if (deleteError) {
      console.error('Error deleting existing features:', deleteError);
      throw deleteError;
    }

    // Store each feature
    for (const feature of features) {
      console.log(`Storing feature: ${feature.title}`);
      console.log(`Has walkthrough: ${feature.walkthrough ? 'Yes' : 'No'}`);
      
      // Insert the feature
      const { data: featureData, error: featureError } = await supabase
        .from('features')
        .insert({
          repository_id: repositoryId,
          title: feature.title,
          description: feature.description,
          matches: feature.matches,
          error: feature.error || null
        })
        .select('id')
        .single();

      if (featureError) {
        console.error(`Error storing feature "${feature.title}":`, featureError);
        continue;
      }

      const featureId = featureData.id;
      console.log(`Feature stored with ID: ${featureId}`);

      // If the feature has a walkthrough, store it
      if (feature.walkthrough) {
        console.log(`Storing walkthrough for feature ID: ${featureId}`);
        
        try {
          // Insert the walkthrough
          const { data: walkthroughData, error: walkthroughError } = await supabase
            .from('walkthroughs')
            .insert({
              feature_id: featureId,
              title: feature.walkthrough.title,
              description: feature.walkthrough.description
            })
            .select('id')
            .single();

          if (walkthroughError) {
            console.error(`Error storing walkthrough for feature "${feature.title}":`, walkthroughError);
            continue;
          }

          const walkthroughId = walkthroughData.id;
          console.log(`Walkthrough stored with ID: ${walkthroughId}`);

          // Store each step of the walkthrough
          if (feature.walkthrough.steps && feature.walkthrough.steps.length > 0) {
            console.log(`Storing ${feature.walkthrough.steps.length} steps for walkthrough ID: ${walkthroughId}`);
            
            for (let i = 0; i < feature.walkthrough.steps.length; i++) {
              const step = feature.walkthrough.steps[i];
              const { error: stepError } = await supabase
                .from('walkthrough_steps')
                .insert({
                  walkthrough_id: walkthroughId,
                  title: step.title,
                  description: step.description,
                  files: step.files,
                  code: step.code,
                  explanation: step.explanation,
                  step_order: i
                });

              if (stepError) {
                console.error(`Error storing step "${step.title}" for walkthrough:`, stepError);
              }
            }
          } else {
            console.warn(`No steps found for walkthrough of feature "${feature.title}"`);
          }
        } catch (walkthroughStoreError) {
          console.error(`Error in walkthrough storage process for feature "${feature.title}":`, walkthroughStoreError);
        }
      }
    }

    console.log(`Successfully stored ${features.length} features`);
  } catch (error) {
    console.error('Error in storeFeatures:', error);
    throw error;
  }
}

// Get features and walkthroughs for a repository
export async function getFeatures(owner: string, repo: string) {
  try {
    console.log(`Getting features for repository: ${owner}/${repo}`);
    
    // First, get the repository ID
    const { data: repositories, error: repoError } = await supabase
      .from('repositories')
      .select('id')
      .eq('owner', owner)
      .eq('repo', repo);
    
    if (repoError) {
      console.error('Error finding repository:', repoError);
      throw repoError;
    }
    
    if (!repositories || repositories.length === 0) {
      console.log(`No repository found for ${owner}/${repo}`);
      return [];
    }
    
    const repository = repositories[0];
    console.log(`Found repository ID: ${repository.id}`);
    
    // Get all features for this repository
    const { data: features, error: featuresError } = await supabase
      .from('features')
      .select('id, title, description, matches, error')
      .eq('repository_id', repository.id);
    
    if (featuresError) {
      console.error('Error finding features:', featuresError);
      throw featuresError;
    }
    
    if (!features || features.length === 0) {
      console.log(`No features found for repository ID: ${repository.id}`);
      return [];
    }
    
    console.log(`Found ${features.length} features for repository ID: ${repository.id}`);
    
    // For each feature, get its walkthrough and steps
    const featuresWithWalkthroughs = [];
    
    for (const feature of features) {
      try {
        // Get the walkthrough for this feature
        const { data: walkthroughs, error: walkthroughError } = await supabase
          .from('walkthroughs')
          .select('id, title, description')
          .eq('feature_id', feature.id);
        
        if (walkthroughError) {
          console.error(`Error finding walkthrough for feature ID ${feature.id}:`, walkthroughError);
          featuresWithWalkthroughs.push({
            ...feature,
            walkthrough: null,
            error: feature.error || `Failed to retrieve walkthrough: ${walkthroughError.message}`
          });
          continue;
        }
        
        if (!walkthroughs || walkthroughs.length === 0) {
          console.log(`No walkthrough found for feature ID: ${feature.id}`);
          featuresWithWalkthroughs.push({
            ...feature,
            walkthrough: null,
            error: feature.error || 'No walkthrough available for this feature'
          });
          continue;
        }
        
        const walkthrough = walkthroughs[0];
        console.log(`Found walkthrough ID: ${walkthrough.id} for feature ID: ${feature.id}`);
        
        // Get the steps for this walkthrough
        const { data: steps, error: stepsError } = await supabase
          .from('walkthrough_steps')
          .select('title, description, files, code, explanation, step_order')
          .eq('walkthrough_id', walkthrough.id)
          .order('step_order', { ascending: true });
        
        if (stepsError) {
          console.error(`Error finding steps for walkthrough ID ${walkthrough.id}:`, stepsError);
          featuresWithWalkthroughs.push({
            ...feature,
            walkthrough: {
              title: walkthrough.title,
              description: walkthrough.description,
              steps: []
            },
            error: feature.error || `Failed to retrieve walkthrough steps: ${stepsError.message}`
          });
          continue;
        }
        
        if (!steps || steps.length === 0) {
          console.log(`No steps found for walkthrough ID: ${walkthrough.id}`);
          featuresWithWalkthroughs.push({
            ...feature,
            walkthrough: {
              title: walkthrough.title,
              description: walkthrough.description,
              steps: []
            },
            error: feature.error || 'No steps available for this walkthrough'
          });
          continue;
        }
        
        console.log(`Found ${steps.length} steps for walkthrough ID: ${walkthrough.id}`);
        
        // Process steps to ensure files is an array
        const processedSteps = steps.map(step => ({
          ...step,
          files: Array.isArray(step.files) ? step.files : (step.files ? JSON.parse(step.files) : [])
        }));
        
        featuresWithWalkthroughs.push({
          ...feature,
          walkthrough: {
            title: walkthrough.title,
            description: walkthrough.description,
            steps: processedSteps
          }
        });
      } catch (error) {
        console.error(`Error processing feature ID ${feature.id}:`, error);
        featuresWithWalkthroughs.push({
          ...feature,
          walkthrough: null,
          error: feature.error || `Failed to process walkthrough: ${(error as Error).message}`
        });
      }
    }
    
    console.log(`Returning ${featuresWithWalkthroughs.length} features with walkthroughs`);
    return featuresWithWalkthroughs;
  } catch (error) {
    console.error('Error in getFeatures:', error);
    throw error;
  }
}
