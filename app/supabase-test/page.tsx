"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export default function SupabaseTestPage() {
  const [connectionStatus, setConnectionStatus] = useState<string>("Checking connection...");
  const [insertStatus, setInsertStatus] = useState<string>("");
  const [selectStatus, setSelectStatus] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [testData, setTestData] = useState<any[]>([]);

  // Test Supabase connection
  useEffect(() => {
    async function checkConnection() {
      try {
        const { data, error } = await supabase.from("repositories").select("*").limit(1);
        
        if (error) {
          console.error("Connection test error:", error);
          setConnectionStatus(`Connection failed: ${error.message} (${error.code})`);
          setError(JSON.stringify(error, null, 2));
        } else {
          setConnectionStatus("Connection successful!");
          console.log("Connection test result:", data);
        }
      } catch (err) {
        console.error("Connection test exception:", err);
        setConnectionStatus(`Connection exception: ${(err as Error).message}`);
        setError(JSON.stringify(err, null, 2));
      }
    }

    checkConnection();
  }, []);

  // Test insert data
  const handleInsertTest = async () => {
    try {
      setInsertStatus("Inserting test data...");
      
      // Generate a unique test repo name
      const testRepoName = `test-repo-${Date.now()}`;
      
      const { data, error } = await supabase
        .from("repositories")
        .insert([
          { owner: "test-owner", repo: testRepoName }
        ])
        .select();
      
      if (error) {
        console.error("Insert test error:", error);
        setInsertStatus(`Insert failed: ${error.message} (${error.code})`);
        setError(JSON.stringify(error, null, 2));
      } else {
        setInsertStatus(`Insert successful! Created repository: test-owner/${testRepoName}`);
        console.log("Insert test result:", data);
      }
    } catch (err) {
      console.error("Insert test exception:", err);
      setInsertStatus(`Insert exception: ${(err as Error).message}`);
      setError(JSON.stringify(err, null, 2));
    }
  };

  // Test insert data for a specific repository
  const handleInsertSpecificRepo = async () => {
    try {
      setInsertStatus("Inserting DekyCS/bagelhacks repository...");
      
      const { data, error } = await supabase
        .from("repositories")
        .insert([
          { owner: "DekyCS", repo: "bagelhacks" }
        ])
        .select();
      
      if (error) {
        console.error("Insert specific repo error:", error);
        setInsertStatus(`Insert failed: ${error.message} (${error.code})`);
        setError(JSON.stringify(error, null, 2));
      } else {
        setInsertStatus(`Insert successful! Created repository: DekyCS/bagelhacks`);
        console.log("Insert specific repo result:", data);
      }
    } catch (err) {
      console.error("Insert specific repo exception:", err);
      setInsertStatus(`Insert exception: ${(err as Error).message}`);
      setError(JSON.stringify(err, null, 2));
    }
  };

  // Test select data
  const handleSelectTest = async () => {
    try {
      setSelectStatus("Fetching test data...");
      
      const { data, error } = await supabase
        .from("repositories")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      
      if (error) {
        console.error("Select test error:", error);
        setSelectStatus(`Select failed: ${error.message} (${error.code})`);
        setError(JSON.stringify(error, null, 2));
      } else {
        setSelectStatus(`Select successful! Found ${data.length} repositories`);
        setTestData(data);
        console.log("Select test result:", data);
      }
    } catch (err) {
      console.error("Select test exception:", err);
      setSelectStatus(`Select exception: ${(err as Error).message}`);
      setError(JSON.stringify(err, null, 2));
    }
  };

  // Display environment variables (without revealing sensitive values)
  const displayEnvVars = () => {
    return (
      <div className="mt-4 p-4 bg-gray-800 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Environment Variables</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="font-mono">NEXT_PUBLIC_SUPABASE_URL:</div>
          <div className="font-mono">{process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Not set"}</div>
          
          <div className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY:</div>
          <div className="font-mono">{process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Not set"}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Supabase Connection Test</h1>
      
      {displayEnvVars()}
      
      <div className="mt-6 p-4 border rounded-md">
        <h2 className="text-xl font-semibold mb-2">Connection Status</h2>
        <div className={`p-3 rounded-md ${connectionStatus.includes("successful") ? "bg-green-900/30" : "bg-red-900/30"}`}>
          {connectionStatus}
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-2">Insert Test</h2>
          <Button onClick={handleInsertTest} className="mb-3">
            Insert Test Data
          </Button>
          {insertStatus && (
            <div className={`p-3 rounded-md ${insertStatus.includes("successful") ? "bg-green-900/30" : "bg-red-900/30"}`}>
              {insertStatus}
            </div>
          )}
        </div>
        
        <div className="p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-2">Insert Specific Repository</h2>
          <Button onClick={handleInsertSpecificRepo} className="mb-3">
            Insert DekyCS/bagelhacks Repository
          </Button>
          {insertStatus && (
            <div className={`p-3 rounded-md ${insertStatus.includes("successful") ? "bg-green-900/30" : "bg-red-900/30"}`}>
              {insertStatus}
            </div>
          )}
        </div>
        
        <div className="p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-2">Select Test</h2>
          <Button onClick={handleSelectTest} className="mb-3">
            Fetch Test Data
          </Button>
          {selectStatus && (
            <div className={`p-3 rounded-md ${selectStatus.includes("successful") ? "bg-green-900/30" : "bg-red-900/30"}`}>
              {selectStatus}
            </div>
          )}
        </div>
      </div>
      
      {testData.length > 0 && (
        <div className="mt-6 p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-2">Test Data</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Owner</th>
                  <th className="px-4 py-2 text-left">Repo</th>
                  <th className="px-4 py-2 text-left">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {testData.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="px-4 py-2">{item.id}</td>
                    <td className="px-4 py-2">{item.owner}</td>
                    <td className="px-4 py-2">{item.repo}</td>
                    <td className="px-4 py-2">{new Date(item.last_updated).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mt-6 p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-2">Error Details</h2>
          <pre className="p-3 bg-red-900/30 rounded-md overflow-x-auto whitespace-pre-wrap">
            {error}
          </pre>
        </div>
      )}
    </div>
  );
}
