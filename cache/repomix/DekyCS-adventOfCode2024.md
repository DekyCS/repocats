This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

## Additional Info

# Directory Structure
```
day1.py
day2.py
day3.py
day4p1.py
day4p2.py
day5.py
input/input.txt
input/multiply.txt
input/printing2.txt
input/reports.txt
input/xmas.txt
README.md
test.py
```

# Files

## File: day1.py
```python
import os

leftSide = []
rightSide = []
similarityScore = 0

f = open("input/input.txt", "r")
for x in f:
  left, right = x.split("   ")
  leftSide.append(int(left))
  rightSide.append(int(right))

leftSide.sort()
rightSide.sort()

for i in range(len(leftSide)):
    count = 0
    for j in range(len(rightSide)):
        if (leftSide[i] == rightSide[j]):
            count += 1
    similarityScore += (count * leftSide[i])

print(similarityScore)
```

## File: day2.py
```python
safeReport = 0
reports = []

f = open("input/reports.txt", "r")
for x in f:
  reports.append(x.split(" "))

def isItSafe(input):
    isIncreasing = True
    before = 0
    current = 0
    for i in range(len(input)):
        current = int(input[i])
        if (i == 0):
            before = current
            continue
        elif (i == 1):
            if (current < before):
                isIncreasing = False
        else:
            if ((current < before and isIncreasing) or (current > before and isIncreasing == False)):
                return False

        if ((abs(before - current) > 3) or (before == current)):
            return False

        before = current
    return True

def copyArray(input):
    newArr = []
    for num in input:
        newArr.append(num)
    return newArr


for x in reports:
    if (isItSafe(x)):
        safeReport += 1
    else:
        for i in range(len(x)):
            newArr = copyArray(x)
            newArr.pop(i)
            if (isItSafe(newArr)):
                safeReport+= 1
                break
print(safeReport)
```

## File: day3.py
```python
mul = "mul()"


maxSearchLength = 8

finalSum = 0

input = ""

f = open("input/multiply.txt", "r")
for x in f:
  input += x

doI = True

for char in range(len(input)):
    try:
        if input[char] == "d":
            if input[char + 1] == "o":
                if input[char + 2] == "(":
                    if input[char + 3] == ")":
                        doI = True
                elif input[char + 2] == "n":
                    if input[char + 3] == "'":
                        if input[char + 4] == "t":
                            if input[char + 5] == "(":
                                if input[char + 6] == ")":
                                    doI = False
        if doI:
            if input[char] == "m":
                if input[char + 1] == "u":
                    if input[char + 2] == "l":
                        if input[char + 3] == "(":
                            searchGood = False
                            for i in range(maxSearchLength):
                                if input[char + 4 + i] == ")":
                                    parameters = ""
                                    for j in range(i):
                                        parameters += input[char + 4 + j]
                                    if len(parameters) < 3:
                                        break
                                    x, y = parameters.split(",")
                                    searchGood = True
                                    finalSum += (int(x)*int(y))
                                    searchGood = True
                                    break
    except:
        continue

print(finalSum)
```

## File: day4p1.py
```python
f =  open("input/xmas.txt", "r")

xmas = []

theRest = "AS"
countOfXmas = 0

for x in f:
    temp = []
    for i in range(len(x)):
        temp.append(x[i])
    xmas.append(temp)

def isInRange(row,col):
    print(f"Hello: ({row},{col})")
    if row < 0 or row >= len(xmas):
        return False
    if col < 0 or col >= len(xmas[row]):
        print("was not working")
        return False
    return True

def checkTheRest(row, col, type):
    rowAdd = 0
    colAdd = 0
    match type:
        case "top":
            rowAdd = -1
        case "bottom":
            rowAdd = 1
        case "left":
            colAdd = -1
        case "right":
            colAdd = 1
        case "top left":
            rowAdd = -1
            colAdd = -1
        case "top right":
            rowAdd = -1
            colAdd = 1
        case "bottom left":
            rowAdd = 1
            colAdd = -1
        case "bottom right":
            rowAdd = 1
            colAdd = 1
        case _:
            print(type)
            return False
    for index in range(len(theRest)): #theRest is "AS"
        if isInRange(row + (rowAdd * (index + 1)), col + (colAdd * (index + 1))):
            if xmas[row + (rowAdd * (index + 1))][col + (colAdd * (index + 1))] != theRest[index]:
                print("fails")
                return False
            print(f"Check for {index + 3} ({row + (rowAdd * (index + 1))},{col + (colAdd * (index + 1))}) = {theRest[index]} Verify: {xmas[row + (rowAdd * (index + 1))][col + (colAdd * (index + 1))]}")
        else:
            print("fails")
            return False
    print("works")
    return True
for row in range(len(xmas)):
    for col in range(len(xmas[row])):
        try:
            print(f"({row},{col})")
            if xmas[row][col] == "M":
                print(f"Check for 1 ({row},{col}) = M Verify: {xmas[row][col]}")
                #Check for "M" on top
                print("Check top")
                if isInRange(row - 1, col):
                    if xmas[row-1][col] == "M":
                        print(f"Check for 2 ({row-1},{col}) = M Verify: {xmas[row-1][col]}")
                        if checkTheRest(row-1, col, "top"):
                            countOfXmas += 1
                # Check for "M" on bottom
                print("Check bottom")
                if isInRange(row+1, col):
                    if xmas[row + 1][col] == "M":
                        print(f"Check for 2 ({row + 1},{col}) = M Verify: {xmas[row + 1][col]}")
                        if checkTheRest(row+1, col, "bottom"):
                            countOfXmas += 1
                # Check for "M" on left
                print("Check left")
                if isInRange(row, col - 1):
                    if xmas[row][col-1] == "M":
                        print(f"Check for 2 ({row},{col - 1}) = M Verify: {xmas[row][col-1]}")
                        if checkTheRest(row, col-1, "left"):
                            countOfXmas += 1
                # Check for "M" on right
                print(f"Check right ({row},{col+1})")
                if isInRange(row, col+1):
                    print(f"({row},{col}) is in range")
                    if xmas[row][col + 1] == "M":
                        print(f"Check for 2 ({row},{col+1}) = M Verify: {xmas[row][col+1]}")
                        if checkTheRest(row, col+1, "right"):
                            countOfXmas += 1
                # Check for "M" on top left
                print("Check top left")
                if isInRange(row - 1, col-1):
                    if xmas[row - 1][col - 1] == "M":
                        print(f"Check for 2 ({row - 1},{col-1}) = M Verify: {xmas[row - 1][col-1]}")
                        if checkTheRest(row-1, col-1, "top left"):
                            countOfXmas += 1
                # Check for "M" on top right
                print("Check top right")
                if isInRange(row - 1, col+1):
                    if xmas[row - 1][col + 1] == "M":
                        print(f"Check for 2 ({row - 1},{col+1}) = M Verify: {xmas[row - 1][col+1]}")
                        if checkTheRest(row-1, col+1, "top right"):
                            countOfXmas += 1
                # Check for "M" on bottom left
                print("Check bottom left")
                if isInRange(row+1,col - 1):
                    if xmas[row + 1][col - 1] == "M":
                        print(f"Check for 2 ({row + 1},{col-1}) = M Verify: {xmas[row+1][col-1]}")
                        if checkTheRest(row+1, col-1, "bottom left"):
                            countOfXmas += 1
                # Check for "M" on bottom right
                print("Check bottom right")
                if isInRange(row+1, col+1):
                    if xmas[row + 1][col + 1] == "M":
                        print(f"Check for 2 ({row + 1},{col + 1}) = M Verify: {xmas[row + 1][col + 1]}")
                        if checkTheRest(row+1, col+1, "bottom right"):
                            countOfXmas += 1
        except Exception as error:
            print(f"Error: ({row},{col}) || {error}")
            pass

print(countOfXmas)
```

## File: day4p2.py
```python
from numpy.linalg.linalg import solve

f =  open("input/xmas.txt", "r")

xmas = []
mDoNotUse = []

theRest = "AS"
countOfXmas = 0

for x in f:
    temp = []
    for i in range(len(x)):
        temp.append(x[i])
    xmas.append(temp)

def isInRange(row,col):
    if row < 0 or row >= len(xmas):
        return False
    if col < 0 or col >= len(xmas[row]):
        return False
    return True

def checkTheRest(row, col, type):
    rowAdd = 0
    colAdd = 0
    match type:
        case "top left":
            rowAdd = -1
            colAdd = -1
        case "top right":
            rowAdd = -1
            colAdd = 1
        case "bottom left":
            rowAdd = 1
            colAdd = -1
        case "bottom right":
            rowAdd = 1
            colAdd = 1
        case _:
            print(type)
            return False
    if isInRange(row + (rowAdd * 1), col + (colAdd * 1)):
        if xmas[row + (rowAdd * 1)][col + (colAdd * 1)] != "S":
            print("fails")
            return False
        print(f"Check for {3} ({row + (rowAdd * 1)},{col + (colAdd * 1)}) = S Verify: {xmas[row + (rowAdd * 1)][col + (colAdd * 1)]}")
    else:
        print("fails")
        return False
    #print("works")
    return True

def findMAS(row,col):
    countThatWorks = 0
    try:
        print(f"({row},{col})")
        if xmas[row][col] == "M":
            print(f"Check for 1 ({row},{col}) = M Verify: {xmas[row][col]}")
            # Check for "A" on top left
            print("Check top left")
            if isInRange(row - 1, col - 1):
                if xmas[row - 1][col - 1] == "A":
                    print(f"Check for 2 ({row - 1},{col - 1}) = A Verify: {xmas[row - 1][col - 1]}")
                    if checkTheRest(row - 1, col - 1, "top left"):
                        #Check the whole x
                        if isInRange(row-2,col) and isInRange(row, col-2):
                            if xmas[row-2][col] == "M":
                                if xmas[row][col-2] == "S":
                                    countThatWorks+=1
                            elif xmas[row-2][col] == "S":
                                if xmas[row][col-2] == "M":
                                    countThatWorks+=1
            # Check for "M" on top right
            print("Check top right")
            if isInRange(row - 1, col + 1):
                if xmas[row - 1][col + 1] == "A":
                    print(f"Check for 2 ({row - 1},{col + 1}) = A Verify: {xmas[row - 1][col + 1]}")
                    if checkTheRest(row - 1, col + 1, "top right"):
                        # Check the whole x
                        if isInRange(row - 2, col) and isInRange(row, col + 2):
                            if xmas[row - 2][col] == "M":
                                if xmas[row][col + 2] == "S":
                                    countThatWorks += 1
                            elif xmas[row - 2][col] == "S":
                                if xmas[row][col + 2] == "M":
                                    countThatWorks += 1
            # Check for "M" on bottom left
            print("Check bottom left")
            if isInRange(row + 1, col - 1):
                if xmas[row + 1][col - 1] == "A":
                    print(f"Check for 2 ({row + 1},{col - 1}) = A Verify: {xmas[row + 1][col - 1]}")
                    if checkTheRest(row + 1, col - 1, "bottom left"):
                        # Check the whole x
                        if isInRange(row + 2, col) and isInRange(row, col - 2):
                            if xmas[row + 2][col] == "M":
                                if xmas[row][col - 2] == "S":
                                    countThatWorks += 1
                            elif xmas[row + 2][col] == "S":
                                if xmas[row][col - 2] == "M":
                                    countThatWorks += 1
            # Check for "M" on bottom right
            print("Check bottom right")
            if isInRange(row + 1, col + 1):
                if xmas[row + 1][col + 1] == "A":
                    print(f"Check for 2 ({row + 1},{col + 1}) = A Verify: {xmas[row + 1][col + 1]}")
                    if checkTheRest(row + 1, col + 1, "bottom right"):
                        # Check the whole x
                        if isInRange(row + 2, col) and isInRange(row, col + 2):
                            if xmas[row + 2][col] == "M":
                                if xmas[row][col + 2] == "S":
                                    countThatWorks += 1
                            elif xmas[row + 2][col] == "S":
                                if xmas[row][col + 2] == "M":
                                    countThatWorks += 1
        if countThatWorks > 0:
            mDoNotUse.append((row,col))
        return countThatWorks
    except Exception as error:
        print(f"Error: ({row},{col}) || {error}")
        pass

for row in range(len(xmas)):
    for col in range(len(xmas[row])):
        countOfXmas += findMAS(row,col)


print(countOfXmas)
print(countOfXmas/2)
```

## File: day5.py
```python
import math

f = open("./input/printing.txt", "r")

orderRule = []
updates = []

goodUpdates = []
badUpdates = []
middleCount = 0
middleCountFixed = 0

for line in f:
    if "|" in line:
        x,y = line.split("|")
        orderRule.append((int(x),int(y)))
    elif "," in line:
        x = line.split(",")
        temp = []
        for y in x:
            temp.append(int(y))
        updates.append(temp)

def find_all_num_before(num):
    num_before = []
    for order in orderRule:
        if order[1] == num:
            num_before.append(order[0])
    return num_before

def find_middle(arr):
    return arr[math.floor(len(arr)/2)]

def check_order(update):
    for i in range(len(update)):
        if i == len(update) - 1:
            continue
        num_before = find_all_num_before(update[i])
        for j in range(len(update) - i - 1):
            if update[j + i + 1] in num_before:
                return i, j + i + 1
    return -1,-1 #usually -1 means it doesn't but in this code it does

def swap (a,b, arr):
    temp = arr[a]
    arr[a] = arr[b]
    arr[b] = temp

#Find the bad updates
for update in updates:
    result = check_order(update)
    if result != (-1,-1):
        badUpdates.append(update)
        swap(result[0], result[1], update)
        while True:
            result = check_order(update)
            if result == (-1,-1):
                break
            else:
                swap(result[0], result[1], update)

    elif result == (-1,-1):
        goodUpdates.append(update)

for goodUpdate in goodUpdates:
    middleCount += find_middle(goodUpdate)

for badUpdate in badUpdates:
    middleCountFixed += find_middle(badUpdate)

print(middleCountFixed)
```

## File: input/input.txt
```
27636   67663
92436   51410
68957   77912
36747   51149
30882   77912
46213   99914
86101   84506
33651   96019
21290   82431
63075   53396
71804   79079
59491   99914
38723   14006
33281   26247
83935   50770
86374   85083
25576   54727
73648   86649
22409   70249
29227   64316
35430   67143
56749   86649
54666   96019
34014   95399
79952   39373
11527   93723
62980   57578
30486   71734
32658   65436
93735   27438
61456   18953
25491   56656
76585   62810
25849   18414
31715   71902
70587   95582
80976   14987
38641   41417
67621   73094
85775   53902
17220   40408
88727   97556
22359   67543
91113   12527
62161   31532
11773   15282
89645   63687
25738   16174
90797   16652
57466   93723
51356   19628
25218   41212
23778   85100
69307   79895
13469   20787
88354   57627
21993   13027
55533   37964
69092   70902
48561   79752
65224   87109
87087   63928
51086   13027
29509   99914
70303   58298
70347   61384
26945   76706
70853   57779
73422   69817
44312   25891
59429   14006
37343   70249
19979   70249
69957   39312
18726   53276
83466   77883
61518   13900
42155   89500
63098   60521
14449   98681
82637   43106
22191   50560
73961   11938
45981   65414
52835   21932
64522   66095
72719   18593
95067   14254
67827   67002
91626   16259
46648   97579
64260   16945
51036   96019
11763   16672
22050   54727
81115   40408
24109   99038
61490   16520
12415   86649
70936   46470
67369   17839
66661   65147
46002   97383
92236   32003
76595   80883
99797   80845
47203   21390
12531   13900
14567   85100
97701   14006
36042   77912
68698   58773
83171   93348
46016   85412
74415   15656
54278   51529
97371   98662
71146   19396
34619   49766
27335   55419
14750   15656
20499   47003
65181   18169
25908   34850
48966   46960
56623   67545
84778   14006
23425   55003
57291   77912
34146   20637
30067   85100
43424   35599
73421   14006
91453   13935
78330   51410
76088   28885
18833   13272
20958   75765
96718   30755
56023   67143
43806   52016
14604   59721
44139   12527
65784   77912
29570   76135
47348   70249
43549   86649
76570   70249
88162   71939
34486   60331
26741   92387
41198   13377
53021   50770
98314   23805
52060   12527
86515   86649
98183   99252
79091   41638
56721   32794
69895   88727
30104   55899
48178   11818
99914   18935
18953   99914
59782   97763
69560   77912
84587   39848
16112   36887
97943   88572
48829   84079
61496   50770
16975   65569
20602   88536
28286   55419
46401   96019
33053   57040
20081   70249
20222   50466
87107   65780
70108   20762
60443   18222
86645   18222
86432   61462
10447   40408
26601   30399
20669   51410
64973   54727
26844   67876
66711   15656
50935   70954
64188   27385
72301   76224
68529   19569
60079   90182
31692   56893
32049   55692
99568   24749
68169   51227
90063   70816
70353   76443
45207   83046
10840   44770
29710   88168
84751   77912
22547   39355
32776   54727
10792   96019
86847   34709
90912   94687
61472   33330
17627   82577
59955   82580
84314   67146
17585   12527
85936   90872
19621   24662
91812   81993
32625   19895
15656   32549
99742   94319
66920   85100
24557   21855
64760   54727
83318   85721
41316   96019
70737   80023
77115   60150
48008   50770
65812   50858
49725   63057
59430   29710
56813   71902
18412   69153
74854   88293
53478   61306
46955   13896
58632   18937
19960   45246
50522   14006
13027   14006
50345   25891
32301   73422
56811   74923
33257   26767
85044   57082
44874   23425
90402   83509
35786   99914
27689   73422
12527   48603
56563   40588
49173   58298
25094   21932
52615   28332
87738   47861
15259   86649
56450   12469
99476   13027
31357   20788
29302   88536
69527   99914
79016   86091
86187   75381
37040   13900
40789   17863
52819   88536
99512   67289
43526   49745
93256   92442
86400   71902
13900   32003
86362   46470
84806   89066
13325   73969
38597   82656
26209   71126
67143   49421
12555   73422
49109   47621
12757   93723
60966   54727
91829   82268
16715   15691
68953   93723
29390   76089
17838   65569
51410   31825
87719   13027
20487   39355
56471   24545
21675   43800
13445   54727
20493   65829
12310   73945
29366   93723
55574   74438
20558   40408
60707   60326
67675   28319
68219   99051
55901   12056
36090   67102
21645   93723
91741   70249
86631   68917
16190   73338
69156   78863
25891   12529
60505   76667
91367   54996
35197   12527
96289   65569
99720   13027
60152   67328
47373   40408
46470   29710
92309   49534
96399   17417
19136   80925
75645   55419
60134   51410
44963   25891
57213   36908
32935   13027
13760   16748
10501   48177
24699   88567
87817   63343
98506   96019
13109   51410
98827   88536
81592   29559
32418   96845
23249   35212
33739   18823
91660   94468
41270   14006
61624   45215
94473   82748
81411   22202
62042   79434
87156   78604
96708   39355
21576   94644
58090   88727
75796   88727
36732   65569
98878   93723
77836   40408
12739   71850
14393   65616
54759   54727
91950   67999
32038   71414
88128   88727
18687   51410
86649   10180
54652   14006
51200   94013
25759   73695
78325   88536
85100   15068
77314   70249
29771   25891
48512   39931
32758   23781
65569   81723
76547   81341
97796   93723
23560   86649
85749   75599
90577   14006
89148   88727
87413   25602
80005   86649
18222   50953
84166   12223
21431   55419
51539   88536
39002   77912
40699   93886
78076   33894
50213   58400
20711   12527
66242   50770
58894   95457
20142   13027
75889   82440
42984   27810
26613   18222
17725   46470
78045   58527
70755   96361
34750   71902
23788   36870
71435   15656
69573   76045
97075   41621
68889   74341
43705   71777
51174   15068
25175   77912
46042   18071
43652   91644
17776   13027
21586   32003
55557   44791
15068   26861
31285   37296
41268   12527
12274   70661
64942   83051
40158   27491
97113   12527
64437   50770
29587   52457
93723   18953
26593   61122
77159   36445
70733   11733
58626   69962
88075   10820
27706   71880
62175   19584
29037   77912
39846   88536
52710   17260
37988   12527
98941   40408
55492   27433
49614   49375
73031   53756
69107   93963
13487   13027
88557   52956
19978   54109
70308   61626
97197   75015
29461   13027
49851   33862
61641   43710
97372   21774
24845   11676
23306   33519
79069   85100
90401   66032
70009   38628
74208   90870
66927   34883
83113   78562
67665   13027
50134   79665
39442   94713
34392   81306
74601   88727
15396   42882
75388   94071
60137   52050
11501   44410
70249   86649
34514   95654
58802   59932
60092   82834
59700   84142
73594   84251
41063   23656
24258   85833
77170   71729
57174   93723
52939   49958
17073   40408
91476   19173
67849   46955
42366   85100
31967   18222
51791   29710
80503   21818
21171   29593
35814   88536
50383   18222
68500   73422
60941   38247
80579   25728
56150   40408
91392   58387
97794   36481
24938   16433
20897   29710
69005   86270
23332   82430
96092   40408
55606   47408
69393   25538
88805   93865
25377   70249
74563   88727
89699   53054
45796   55419
56407   67840
72925   97565
88536   75060
33881   70279
19496   13027
26289   44211
51334   88536
12579   46470
69622   39657
17900   77122
67747   89325
79881   21053
61202   42967
70883   87544
16535   93383
26503   45342
28297   61791
50933   96173
32002   32699
34690   57980
28399   29710
13660   21932
98065   27996
50853   35963
88438   86562
36165   73677
79940   40408
40541   67170
20091   91424
39355   99566
13081   14006
58083   81235
54830   49834
32825   96019
83692   43716
95628   73356
74443   89957
35677   36499
75279   88536
71821   80590
84260   98484
59645   59826
35932   50116
75575   22994
73616   84555
51144   93243
60005   14006
12864   10684
77834   48318
69011   41387
97024   46470
98000   64609
26029   33500
33877   94750
55830   93723
15334   85100
89061   23221
11922   77337
47976   22799
11635   91933
75213   24886
90993   41805
90684   25891
72604   76753
42647   85843
40408   68133
75946   51218
70196   25891
30412   57914
97066   18953
38230   13899
29377   11580
75574   72968
29393   72845
77297   89211
16269   94844
82893   88061
37116   76838
80997   20602
97618   91685
33698   51410
61935   12527
44252   79583
46297   65424
21075   15121
61997   65569
82784   24455
32616   50770
65600   52179
70762   93723
33830   14006
59127   76111
79111   42235
14634   65569
61114   98404
34701   57155
66321   32003
71411   77114
36070   54003
44096   31057
17790   54727
94384   50770
55954   71902
48200   87183
77912   12527
68228   18280
98972   44903
36198   50770
38106   65335
25785   12527
76187   77603
23889   85100
68678   41314
22106   18953
24718   77912
23942   40408
78992   55995
69199   55700
53735   79770
44697   51111
32874   28161
65350   46470
31226   70249
25736   68636
35753   99319
84252   54258
28351   73446
36754   11085
81734   37763
20447   86649
93586   53062
68321   90392
60154   94363
94162   12527
49437   88536
36753   77770
52652   51410
44124   77727
41114   39334
16864   77072
83149   65132
59730   54727
84057   23618
30656   12284
92801   37685
49414   78016
21932   88727
83899   99914
50417   73542
42247   36961
11620   12527
89175   55534
29239   54727
52046   39122
10565   13027
94606   34488
80368   51410
19058   70249
52560   88727
94907   94594
22583   59070
87045   57573
81908   66470
52664   14006
85444   50714
79620   41857
64520   28656
77565   40408
54891   79480
60407   67143
94156   85508
78606   12527
49973   99914
18848   12527
16148   13383
39583   88536
71135   76625
15135   88536
81304   13900
78906   24249
70225   84691
82947   40735
56886   59761
87699   68570
48939   46470
72665   99460
29077   13027
37693   86226
49023   23978
14671   63325
95319   61292
40288   73784
40842   70647
52129   68530
59166   91619
21052   11307
98213   99699
61504   13900
27254   99914
30050   25730
75338   80979
91814   16267
84916   50770
51427   88782
51277   82884
50738   85720
71902   32003
61287   54727
48427   93265
34807   51980
56975   96019
58937   51410
64930   22005
72532   55499
40608   56661
53656   88727
62477   96019
48812   88536
37482   25188
32909   71902
60132   12743
36648   92407
26489   46955
25601   23377
17624   71902
69982   63535
23798   12527
14088   46470
79596   12527
47284   18073
66594   82908
47309   21386
41035   86649
95662   18222
19255   70249
59514   22092
83736   32111
19643   64859
30590   26610
16132   94311
61696   45689
67551   96019
12741   12527
78583   25891
26961   17506
78162   56028
80916   83853
98196   76265
58308   16344
40122   58950
53743   21620
24428   86026
78836   73860
10212   38302
19115   36550
15104   93723
16369   51410
68786   14006
43892   40408
23295   29751
91988   79020
20067   54727
43312   77912
68147   71902
13779   32131
94847   40408
91423   73498
69229   13900
25697   72238
99306   63294
66446   48149
69853   29710
92750   51625
81823   55419
36427   15068
86459   66813
48199   81641
20218   56086
83018   39032
72219   50770
94256   93723
32003   39207
47335   14006
42785   62691
74560   63579
27781   86649
15494   13647
92404   45629
84689   85500
17033   21765
10332   13027
35398   79463
92891   79965
33833   48986
55107   99914
57461   88727
60916   87668
79014   20602
17965   13027
10123   29710
36522   46583
83178   51594
92593   37792
38714   21861
40023   13395
72206   73081
36381   75286
90435   26071
97471   69336
97952   40145
56034   20097
13292   81538
20477   50770
11873   77989
60247   50523
67149   48592
49108   68874
68890   87402
40881   94963
35432   13027
39476   47915
90012   54566
92534   48674
92032   50770
27585   79761
37875   37853
89774   13027
61075   15674
60756   87360
47898   92766
96598   68826
50236   47764
55057   70249
54727   17366
13681   54727
17072   77525
42614   90096
98669   82051
57089   13900
18696   54195
94345   35225
44841   88536
38879   23114
83766   94182
58826   99914
41811   85416
72019   50770
38976   86649
42451   59949
14546   55721
99835   97560
49639   30033
73524   60863
65556   87850
96707   58953
27288   74220
46483   15656
72352   96712
32100   70249
63167   14314
16622   95903
19000   15656
42483   78654
54025   76612
70377   60749
39261   36106
21224   96019
50908   82897
33035   16572
96495   31039
58082   88727
81593   19590
35755   54727
67526   44620
72752   89000
83650   17979
70801   85100
25664   39700
44529   12527
59027   70249
16374   51410
80656   73108
66428   70249
13405   29710
24375   51410
68087   40408
76117   48681
94015   65689
76691   16635
99054   13378
30917   90481
96893   25891
62567   21627
94245   10321
14080   40408
49942   29710
27954   25201
75660   93412
78795   88727
77270   88727
85985   42151
30119   46470
24570   15656
38301   25919
60012   82323
17386   61141
41982   15656
52502   14428
40518   16829
67678   88727
98468   67870
58153   18953
99115   15112
46175   92280
76963   70249
47731   85214
23760   73422
67026   30272
60174   27340
53612   13317
54298   88727
96019   77912
38623   64924
64015   99483
78520   32003
55419   65046
16763   77012
79038   70196
10821   93823
21975   92009
59774   70249
49520   59948
23429   74262
74297   84035
60268   86649
97106   70249
67040   13027
64952   32110
28218   14006
40852   83878
14006   78414
71194   95950
49032   88536
93565   76366
87180   54727
44863   27608
45305   75367
92628   30076
53704   25974
98469   33452
59903   54979
10499   20819
83104   67143
96322   65569
32582   14006
56098   93723
94744   60959
87479   15950
89231   11601
50869   70404
38814   73422
32132   73422
74145   35520
90512   88727
70617   38209
58298   48954
56952   29710
68984   70249
72264   56329
58999   54727
48633   42365
56154   57575
24276   54727
24166   14006
43755   59506
14184   65569
89299   31443
44142   46882
91129   86649
85560   86681
64723   14006
15506   10738
48493   71902
66107   48245
91213   16367
52172   54762
57989   56463
12155   82395
77388   25091
43192   47163
72417   30734
49430   71902
70268   85100
44133   81902
19946   82107
39220   51410
28498   29710
50770   27829
95962   15656
61245   14960
74434   46710
21991   30826
```

## File: input/multiply.txt
```
(%%from() when()mul(73,623)when()mul(793,458)'~where()how()?how(569,237)/[mul(709,198)mul(395,622)$!what()select()^@/what()+mul(970,343)mul(75,7)^))mul(61,40)select()~why())'>where()%+mul(892,307),!(mul(412,807):*&what()+^why()<^why()mul(706,931)'{who())why()^?mul(953,62)(mul(461,410)when()don't()>^@<%who()'mul(365,15)(<^<# (where()mul(802,710)why()*[(  where()where()mul(684,352)&)&what()^<[>mul(246,913)+select()?how(489,271)when() }why(627,30);don't()+&<@where()when()mul(636,990)]/mul(767,759):mul(328,474)([^,-select()?(mul(825,353)select()where()*where()what()*-@mul(765,991)where(786,744)'--where()mul(990,947) mul(547,706)from()?mul(229,193)where(617,453)+@&where()]@%}/mul(128,550)<%mul(3,636)don't()^(+#>+mul(66,503) select()#when()%from()mul(59,150)how(),when()^:mul(614,438)where()*<[where();(mul(434,344) /how()$ (%?~when()mul(659,534)mul(809,367) where(42,397),);? ++select()mul(858,771)<*mul(106,962)^>@;# @?,*mul(208,462)'',)mul(762,748)+[?}>][^mul(126,384))@]): /(('mul(966,704)who()what()~%*]from()mul(825,633)~$)+ &mul(634,698)(how()<@why(102,647)mul(661,112)]&<(%&mul(25,649)who()select();mul(267,405)why(356,766)why()(where(),select()^)mul(552,557){!from()^&>>+mul(493,578)select(742,239):how(){^mul(836,239)who()/)-mul(259,726)how()-;where()[#@from()~mul(495,301);>[;mul(478,953)$#[*why(),{mul(774,653)how()^mul(469,614)!what();-->>;mul(369,74)$who()who()mul(311,382)< ![>?$mul(909,70)!+$how(257,485)<mul(278,404)] where()':mul(824,974)when(),;&@-?~>mul(377,363)where()&why()-/:(mul(285,466)where()(what()why()[where()&who()mul(701,477)(where(),-why(){mul(624,21)where()[,why()-!?+mul(937,219) mul(604,90)how()(')]why()/mul(627,697)*;what()/$select()do()~<from()%-^mul(605,52)>@%!&select()>['mul(597,962)why()where()mul(903,469); &,do()when(937,722)((~why();^mul(588,272);}?[mul(295,621)from(645,893)>]>#mul(900,24)>,;mul(574,932):}(-do()from()-+<'$how()mul(694where())select()){how()how() (mul(350,308)/{)}why()what(987,719)}!#don't();<how()[from()/-'mul(438,672)}!@who() }?)mul(952,413#>:}-: 'when()select()mul(547,749)$#mul(869,866)@{mul(334,736';'select(330,146)[~ :>mul(511,40)(mul(11,3 mul(547,132)[!>select();who()mul(424,102)*!~mul(725,298)~:{^?%*mul(514,355%'],,: -)mul(116,719)select()?/@;when()<who();!mul(352,211)+#$;{$>]mul(820,414)&when(),!?[:?don't()when()?>}+#how()mul(159$$},:]why()-mul(689,30)@^mul(310,593)where(800,717)^(/*/! from()<mul(7,727)select()&mul(259,310)where()^select()#@how(49,595)what(){>]mul(429,841)(-+#[mul(579,668)>what()&+,mul(850,283)don't()#?mul(758,673)^;)select(856,890)%:how(550,676)<,)mul(667,314)>:[;+mul(760,374)select();}*select()#how()$*mul(347,822)who()how(){mul(497,700):where(){what()mul(851,789)^:}when()why()where()(:mul(991,536)-mul(711,63)',(  who()]mul(798,573)>mul(190,153)$]from()!mul(592,256)-$-]mul(734?mul(482,742)#;mul(939,69)how()([how()<what()$$who()why()mul(149,831))/'when()mul(152,123)+* ','$where()mul(774,252) ;@?,;don't()how()>(mul(933,652)}mul(882,656),?how()#%}do()!select()>}>mul(981,750)mul(927,646)!what()$mul(380why()$]/[*?+)mul(67,435)>select()@-mul(819,795)?/? how())mul(215,234){,#/>how(513,708)'~>do()#}^^mul#how()how()how()+when():mul(992,63)mul(526,962)where()}who()who()+&'<,mul(730,728)}/,select()what()*who())[mul(687,974)-<:mul(259,420)
who()(&?>'+:?mul(483,827)*!what()[!/*mul(368,168)!&;^)?mul(629,217)]^{what()!,who()mul(83,255)^)mul(500,689)!-mul(592,556)%select()}from()-+mul(946*who()?,from()%/'~from(619,712){mul(747,249)/@+%when())mul(762,891)what(),when()?,#<:[mul(873,69)+ :what()+how()&[}who()mul(591,81){when()mul(151,432)@<what()-@]do()/mul(233,269)%&![+where()what()-why()mul(402,497):@from()where()':(how()mul(520,79)!]^$<select()when(478,105)mul(340,948),(mul(410,461)select()from()]-(@who()who())]mul(511,538)!who(6,403)do()<(where()what()mul(443,727)when()where()?&where()~mul(302,402)&mul(599,23))[how()[+!{mul(823,16)#%#]+~who(942,742))how()mul(502,890)^;<where()from()!~;+;mul*$<;mul(25,421)/:where() {^who()mul(652,45)#?from()^~; ,<mul(783,401)?who()what()mul(828,237)!]^when(126,561)mul(724,536){<*?don't()])why()/mul(974,752)%]$})mul(688,4)!'#:'@$mul(115,891)['where()when()<where()#@mul(391,949)what()>,$mul(459,691)#>';where()mul(537,593):/]-'#),+mul(900,640)%*{why()?from()mul(750,181)]{%;]mul(771,902)<>$]how());,mul(646,610)why()mul(644,958)[/{<*)mul(490,14)/where()why()::where()${+?mul(524,278)when()mul(609,995){*(,how()(where(18,555)-who()mul(456,815)do()[$:~(}@mul(987,108)<select()who(),>}@>when()<mul(561,928)}$how(984,377)+:what(){ %]mul(242,236)mul(401,270)mul(144@who(){from()-[mul(850,190)& #where()@^/'>mul(511,942)select()$(/<mul(404,904)<^when()'how()[when()$}}mul(891,878)mul(381,288)<+[[<from()who()-mul(282,737),who(){what()-!>mul(60,709)(mul(291?}where(670,848)who()@from()',mul(890,902)[){,&%}%mul(539,945)%$~what()do()#what()how(931,606)!,',what()mul(175,630)]@-&when(98,693)$when()when()mul(850,996~;:@who()<^}/'mul(103,549)how(482,381);when()mul(408,760)where()!mul(796,714)&^]}mul(557,352)how()+{+]select()mul(135,816)?##@<mul(812,707)(^^what()%&$]mul(305,996) ?what()[mul(19,420)~{;mul(451<who()mul(678,132)!:]select();'select(414,538)-what()@mul(775,858)+'{ :[mul(151,737)*mul(305,447)?+<mul(773,348)*% ~}!>+do()@;from()%(mul(571,910)don't()?)%^+%mul(738,321)who()>&-?what()don't(){[?why()who()mul(558,221)}${!'(+*who()do())how();#<>?<mul(824where()mul(351,367)#/ :how()mul(212,77)}<]]mul(769,809)#when(303,117)select()(<':!%(mul(126,148)]why()%[^why()where()]mul(288,573)~@]>%'why()>)mul(850,160);~[select() why()why()~;mul(276,634) +{mul(615,507):when()++#:mul(817,325??(mul(748,223)^<!&^] &/mul(755,745)&:!&who()]-#;,mul(674,378)why()&}-how(667,459)( mul(688,272)'<who()~do()mul(608,206)~$^:'*)?*mul(47,323)mul(612,590)({how()mul(966,673)'(^/from()where()who()mul(802,18)mul(8,840))how()'^#[}(mul(588,513)(<[;when())) how()don't())who(97,403)mul(642,367)where()when()who(),why()from()'mul(333,247)+[where()-]+*mul(7,926)^!where()%'#where(109,801)mul(247,920)+}-&]select()select(878,420)#mul'{::what()how() mul(281,809)~/,from()/+^how()@>mul(67,325)mul(10,782)@-~#]$when()'mul(750,235)$from()]mul(434,941)when()~mul(375,426)mul(804,124)from())^when()from()[mul(478,817)where()where()$what()from()why()what()mul%%??:&mul(948,781)mul(135,972)%}$mul(466,336)#]mul(856,500);~,'%{?#?&mul(586,708)why()how()who(145,202)*who()why()%'who()#mul(784,992){{#mul(829,121)&/select()@%])mul(775,997)[@#mul(419,536)when()mul(526,395)<$;from()  when()who()%!mul(631,345),why()%%~~-;-,mul(197,766){don't()%+}}}>,*select()mul(607,892)
mul(213,399)mul(50,339)]what()when()mul(15,850) $when()@)<why()}mul(863,448)[select(324,8);[mul(258,387)[~)-)why()mul(385,665):];(select()mul(260,974)when()mul(433,796)what()@!!*{where()mul(281,280){what()%{mul(996,146)'how(137,696)why()@*$mul(18,665)#who()@/(*?how()select()what()mul(817,632)<>]how(967,387)*!mul(287,345) ?why():,when(70,954)/;mul(593,904)$}/!mul(892,400)where()where()where(){where()^~how()mul(383,495)mul(268,214)why()$:^]^mul(269,261):-%why()%mul(530]when()(?]^!/what()@do()select()!]mul(186,765)&select()?:why()why()how()why()mul(77,756)from(){),;from()'when()where()mul(199,620)%'::mul(119,703)'#from()from()!'mul(315,665)[from()'',from()}( /mul(771,150)# mul(596,340) )>^don't(),'~:who()where()-$mul(697,969)!}why()mul(21,213)}]<#'+where()]>mul(857,557)where()when()[>-:mul(149,573):{where()'from():mul(810,346))}why(665,355)where()^mul(656,308)what()how()] @mul(528,812)mul(679,912)mul(748,249)*+how()mul(268,67)&]+< mul(817,699)-$-who()%mul(96,615)<:~what(941,999)--mul(217,695)]$))when()#/<from()^mul(687,294)#<}why() mul(870[#:*:where(659,602);[^@mul(136,411)where()what()[~where()+don't()@~who()!when()<why()mul(374,239)mul(65,349)&mul(149,46)]/>+ how()~}mul(909,65){:<'mul(349,935)select()@select()<mul(290,106)mul(874,477)*}, &,?}#mul(18,640)mul(973,307)?@$ [}mul(340,58)()$mul(878,389)~>#mul(472,182)?@[^select()what()mul(9,773)#'how(50,359){how()mul(512,560)mul(424,565)who():*{mul?%{'>-<-mul(732,974)]what()?-mul(549,212),{mul(45,855)(*<()>mul(811,328),what()<>$select()),?mul(785,169)^,mul(271,507)mul(135,488)*when(529,46) <where()what()from() how()mul(11,833)mul)$]who()>#}*select()from()mul(662,175)#$(;why()['why(){/mul(472,524)}<}~-@]mul(561,924)when()@%select(803,251):/})mul(602,358)-!%%$]#who() mul(986who()}{how();$'how()mul(423,659)where() ;?{[][)mul(682,685)><#>):mul(567,299)?+what()<mul(766,452),?~![mul(18,685)(::@-;->!mul(278,215)^~what()':(who();{mul(769,517)~how(365,364)from()'}why()mul(707,262)/!/how()><mul(339,279);/$do()^mul(256,483)who()<!mul(553,945)mul(500how(448,619)select(){~?)!(mul(607,566)$mul(777,986)how(): 'who()mul(205,345)from();+#when():do()~(when()what())what()/mul(174,64)]how()mul(537,63){^;who())!<what()(mul-why()mul(699,680)'/}*mul(465,40)mul(353,270)<!?; -?mul(350,912) {](what(){,from()@mul(813,789)*$;how()select()];]mul(198,144),:,-why(),mul(862,852)*mul(965,644)select()mul(884,219)~@!mul(435,862)select()$why()how()^mul(165,208)mul(979,195);mul(164,454)where()@?mul(957,86))++@-% what(543,264)who()mul(372,43)*$<who()?}<mul(176,225)/mul(764,915):~what(),!!mul(767,820);%where()^]mul(637,588)mul(7,937)?when()mul(930,146)where()?mul(148,167))select()+how(70,96)do()from(){]-{mul(791,513)>what()}>:]]select()]mul(56,217)[!,when()'why()where()<mul(762,753)what()<'*{+when() mul(654,921))mul(724,639):&{@why(521,545)(?how()who()mul(66,494)&'where()mul(308,521) -%$]:](>mul(974,552)'[]'mul*,do()#,>}mul(765,313)](,>who()#!/usr/bin/perl +how()#;who())>@%mul(868,912)where() #) @'/mul(764*<{do(),,,'+^mul(173,253)
from()[^!mul(447,170)],/why()from()#mul(390,953)when()who()<>)%'@mul(830,176)what()!+:@mul))#>mul(350,913):,)*+mul(341,997)#+ mul(49,490):where()})select()when()mul(434,911)do() from()&[,who()how()&mul(277,83)@select()^{!,what()>:mul(896,117)why()-/mul(22,967)$^!)~)mul(540,843)^>}@^*/~[select()mul(305,728)mul(234,965)where()&;>;<)mul(536,159):#when(907,337)~/[^ where()mul(255,249)mul(47,296)*'select())+don't()+how()why()^ *@select();mul(985,160)}-<why()mul(283,5)how()why()^from()mul(930,617)>{what()),<^-?$mul(506,985)select()'>do(){how()  from()why()mul(329,225)$mul<don't()*{(who()*+mul(603,836)@mul(947,431)who(638,671)!don't():,what() {%*when()~(mul(179,618)*why()&;>;*+%when()mul~]who()$~from()when()?)mul(833,539)/%;!%^~#mul(37,690)@<':*>#~(mul(527,38)}who()~how()mul(812,603)$^who()why()&+]*mul(743,253)<mul(164,237)from()!&+$ ~}#^mul(250,473):who()(how(),,?+^mul(91,450)&select()from()'#where()from()-{$mul(245,112);&why()why()where()'/mul(332,324)%,$:where()~who()when(896,261)when()mul(551,82)!]mul(316,126),$from();mul(164,359)?[/from() $$mul(384,892)[where()$how()mul(721,238)-&don't())when(177,679)why()from()^from()+when()mul(404,530):do()?from()#&(({;^%mul(378,543)-mul(126,360)mul(699,438)mul(336,574)why()where()>}*,+'-from(486,483)mul(811,380)when()how()from()from()what()how()!mul(7,69);~!]^){why()mul(478,680):!/mul(227,472)why()from()]&mul(376,566):)! what()mul(241,708)select()]mul(410,202)what()where())do(){^mul(560,185);!<@mul(711,222,:@$*~*mul(103,347)@from())from()mul(657,475)/!;don't()!]who():$why()-}}:mul(451,895)^mul(981,444)-&-why()!#mul(100,601)where(){,how()<mul(213,723)mul(685,739[(mul(182,236),why(166,364)<@+*}&,mul'<mul(807,707)@)),(^do():;&mul(387,217)mul(878,247)mul(245,166) ?why()():/-+,do()! when()[~why(703,68)from()mul(694,278),: how()$*:[?mul(475,535-<<when(277,526),{/;what()?mul(798,822)^)^mul(138,477)how()]mul(663,377)why(568,281)how()[what()*<what()-@from()mul(655,71)<&/mul(35,807)select()]!,$&?,where()mul,/!}])/'mul(548,258)*)(;/why()don't(){>:[,*<[ ;mul(246,732)  <?mul(236,319){what() when()^'?who()mul$^mul(931,998)mul(251,79)mul(809,168)>[who()[)mul(734,171)#mul(879,259)select()*@when()mul(254,156)+mul(141,798)don't()mul(202,831)>>]/select()#!how()mul(601,846)^*,select(){from()mul(458,799)how(){why()'from()<mul(329,548)+ *^^mul(960,300)mul(615,752) &>who()?#how()~}<mul(916,199);mul(589,487)(/^)who()<@&what()mul(915,165$~?$select();~mul(83,883),select();;(where()]mul(839,114)[&how()-/-who() where()mul(594,959$+::$-what()select()mul(929,442)?why(){@mul(459,224)}}mul(699,260)!'+mul(911,579)^%(;<:&mul(644,689)how()where()how()mul(807,693)mul(400,649)select()^@what()mul(178,58)>where()[{who()select()do()from()why()from()mul(578,283)/*why(495,577)%select())'mul(475,993)@mul(673,70)mul(329,734@-how()when()*@where();&-[mul(703,672):+){who()<)&~)mul(770,646:)why())@~ @why()mul(867,88)mul(996,854)~what(804,700)where()mul(57,884);[how(),mul(593,934)what(324,653)when()}<!what(){/mul(824,86)^where(556,386)from()+mul(373,832)*'mul(729,891)!when()from()($#from()from()how()<mul(446,196)}%{?why()how()<mul(738,551)*what()'+mul(793,105){~^when()where()mul(325,94)@/>%mulselect()how()#/?*mul(588,116)*how()[don't()]@^:}how()??mul(881,189);+>@&<,why()#mul(168,770}mul(220,688)do()why()how();{- +(how()-mul(698,77)
}where(174,722)({(/ *mul(582,635){what()~/:mul(470,940)where()'&mul(222,145)mul(880,163)$%*#>@how()how()%mul(25,277)(how(),-why(138,788)mul(41,986)]%when()from();<mul(362,999)select(),<^select()where()mul(768,107)select(){^}}(select()-mul(168,428)when()where()when()mul(179,874)when()-mul(835,227)]*%;how()'(mul(566,914) <do()@{ mul(438,926)[])!#;+mul(105,95)%[%~&?what(){mul(823,678)-what()mul(109,261)]{}mul(641,489)]~} +when()mul(921,460)who()(where():/ '+]mul(837,808)///?)$what()}mul(725,517])how()&[~[mul(837,920)how()~$&;</*mul(211,958))mul;(,where()mul(902,856)}!how()select()$:+mul(483,84)where()@>who(869,346)how()*why()([#mul(52,895)>don't()>+}!how()when()when()%#when()mul(765,168)from()mul(710,790)^#&~+select()mul(868,851)<where()mul(517,296)}how() +{]mul(401,32)mul(822,869)-when(940,602)who()~!where()mul(862,748)when()[:when()%why()mul(608,342)mul(357,681)%]$#!~)mul(303,13),how()what()mul(323,541)!()where()>from()how()->don't()^what()#>who()<;mul(722,400)~mul(217,112)from(90,168)!]when()$mul(806,665)%}>who()%-~mul(94,953)[-/*mul(322,64)when()mul(214,392)how()-{$:}don't() why(){,-who(703,968)!-mul(251,12)how()who()?from(538,173)&%@mul(318,562)how(),select()&,how()where()mul(239,777);~-mul(354,576)/~@$!^[when()mul(274,212)why()*mul(184,508)who()<@#do()]+where()mul(328,716)select();%mul(459,510)^'*when(632,422)+#where()how()select(260,585)^don't()^from()]$select()(who()how():%mul(35,792)mul(884,132)#mul(634,560),who()who();mul(759,868)/mul(688,411)why()mul(850,281)?--(>]mul(348,71)mul(725,441)who() select()*mul(373,244):why()who()<mul(554,7)from()^@&where()@^mul(561,205),why()}mul,>!,%&/select()mul(266,281):-what()',%select(769,776)[when()mul(478,447)when()^select()%mul(834,170)mul(867,978)}^-!how()how()@mul(884,586);!-}mul(681,431)who()[select(),}from()>@,)mul(358,409)+*/{when()@mul(798,937)^@mul(811,516)mul(683,569)when(222,647)what(240,706)why()mul(271,504),what()[)#mul(194,749)why())select()mul(452,63)[how()mul(675,660)<}*!-]~!'>mul(604,21)<where()mul(393,791)%who()/what()/~#mul(947,930)'-mul(361,577)>:who()?(>[mul(650,115)})]<;%mul(384,732)*mul(749,686)where()mul(524,177)^'+! >mul(698,944)*where()!^@]how()don't()-mul(573,409)$><&'*mul(985,814):from()mul(531,513)%]when() [!how()[]mul(322,404){;do()-mul(760,394)]mul(845,760)mul(691,945)why()}$/,mul(589,837)'$[[+&>mul(864,413)%~when()@'mul(650,851)$why()!where()!from()mul(437,509)why()mul(671,154)'+^#]how(),how()mul(248,241)mul(36,707):/~$%~>mul(415,475)select())(~(where())}mul(956,228)mul(310,43)how()$how()[how()~from()mul(230,10)what()'when()what()~why();:how()mul(219,566)how()*$#,>don't()[how()[,:]}%@%mul(907,64)@&why():]$)!mul(469,550))<]mul(328,818),from()why()]do()^'mul(525,979)how()<;]$+mul(451,350)~who()/'*<mul(824,446)^where()how()mul(212,756)</^mul(59,557)+mul(810,500)@/ -?:~+mul(957,32)how()}>what()]!$mul(322,822)mul(837,964),mul(997,114)??]how()mul(326,455)
+!!who(111,197)<#mul(927,707)~@-()'mul(310,954)select()~;>%'don't()/mul(111,300)select()^#<,+-*when()where()mul(853,48)},where()<} do()>why()[* :mul(329,340)mul(775,432),what()]#select():mul[how()mul(975,305)don't() mul(380,23)<mul(610,328)$mul(547,22)how()where()select()'-when()select()how()*do()when()*&{@mul(509,794)'/^who(){what(){who()what()why(559,447)mul(527,574){*mul(640,883)~[, >^-^*mul(92,490)<?:#!);'mul(830,759)^-*~:?when()mul(658,459)who()do()%; %mul(901,84)@  {);mul(176,691)select()&]&[:[when()(who()mul(787,832)(({>!who()from()}@mul(482,720)/+mul(341,296)/%)%}$mul(199,41)?;select()mul(952,575)+%!;from()mul(629,288)from()mul(261,169) $when()mul(137,539)mul'who())who()# :,#!how()mul(712,429)^how()who()?;mul(572,59)>{ @mul(471,598)(>}select()*+mul(482,644)select()^why()select()+~!where(),mul(5,217)^>mul(927,157)mul(192,700)mul(598where()(}who()mul(914,246)mul(146,709),mul(545,12)mul(531,165)>#-&!*}mul(861,209)}{how()??(mul(469,555)/<:]}+%select()?mul(544,310){select()mul(549,681)+@^$ {?)%mul(625,262)%mul(658,715)-where()?/]who()* $&don't()what(366,880))mul(339,633)mul(282,510)-?'mul(538,886)mul(431,412)select()?# ]]mul(16,157)}}(!select()/mul(925,798);what(934,305)*[+-$why()what()mul(882,680)-/mul(554,323)/)where()when(),mul(384,806)~where()select()why()}what()[mul(291,811)&!how()&)where()@mul(675,825)when()mul(703,914)%-% ?@mul(733,721)/'*<mul(404,764)?!&mul(302,783)%/where();-,why()*mul(106,771)mul(422,483)!/?!from(746,984)don't()from(818,501)when()$;,'#>what()mul(452,139);>!how()(~how(681,256)&who(740,533)don't()#%why()+where()~mul(52,930):+ /do()&&:how()why()'mul(673,741)}where()don't()(who()mul(496,885)/mul(126,603)what()select()who(301,758)when()from()-mul(890,826)>]when()^>mul(231,474)!when(456,931)!where()[ how()+!-don't()mul(168,864)?mul(711,701) +^:: mul(243,505)!from()-+'?<select()mul(893,538)&-:mul(871,651)[from())(don't()({'@;&#mul(406,612)mul(52,182)[mul(785,121) mul(497,363)(who()(),mul(799,612))from()mul(518,886);&&%}who()^!mul(706,840)/mul(846,51)#>~;when()how():who()mul(482,341)<>!'where()why()}+mul(690,370)&#who()mul(682,266):@,+]^@-$mul(228,532)+#+where()from())'mul(547,133)@*mul(764,842)mul(181,500)*%!'/]mul(366,266)>](?>*<:why())mul(786,240)/ mul(980,844):@;![mul(932,294)[mul(582,252),when()?why(),~how()mul(619,83)why()??(^select()!mul(915,820)from()[+^don't();:# ]mul(421,350)'}how()mul(429,848)~$!select() ?/+/)mul(393,36)what(),%<-;+~mul(333,687)$(select(){{<select()what()mul(156,751) >-what(),mul(364,843))how()mul(148,833)how()'from()from():[}$mul(134,950)from()what() (what()mul(512,454)how(),mul(775,814):select(820,315),from()>who()how():**mul(329,285)where()?don't()!/->~/' mul(873,470)+-[(select()from()select()/why()?mul(911,768)what(805,778)mul(690,737)from()who())select()<~mul(248,530)mul(638,821)mul(218,217)(^why();&mul(684,550)
```

## File: input/printing2.txt
```
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
```

## File: input/reports.txt
```
67 69 71 72 75 78 76
4 6 7 9 11 12 12
20 22 25 27 28 29 33
35 37 39 42 43 46 48 53
46 49 48 51 53
31 33 31 34 31
83 86 85 88 89 91 91
74 75 78 81 80 83 86 90
72 73 72 74 75 80
19 21 22 25 25 28
4 6 6 7 10 9
49 51 52 55 55 58 58
40 41 43 44 44 48
53 56 56 57 62
26 29 33 34 36 38
35 38 41 45 44
28 31 33 35 39 39
75 77 81 82 86
85 86 88 89 93 98
78 80 85 88 90
36 39 42 43 44 47 53 50
74 77 80 85 86 87 90 90
51 53 54 57 59 64 68
15 17 23 25 32
46 45 47 49 51
25 23 26 27 30 27
51 50 51 52 53 53
51 50 52 55 56 59 63
40 38 40 42 43 48
23 21 22 19 22 25
22 20 22 25 24 27 30 28
95 92 94 95 93 93
78 75 77 76 80
31 30 31 33 31 32 37
12 10 12 15 15 18
67 66 68 68 67
67 64 64 66 66
71 70 72 72 74 75 78 82
15 14 14 16 19 20 25
50 47 48 50 52 56 58 59
5 4 5 8 12 15 14
37 34 36 40 42 45 45
5 2 4 5 9 10 11 15
11 8 12 13 15 20
25 22 25 32 34 37 38 41
6 4 7 10 16 13
95 92 97 99 99
17 16 23 24 28
78 75 80 81 86
11 11 14 16 17
40 40 43 45 48 50 47
37 37 40 41 42 43 46 46
90 90 92 94 98
35 35 36 38 43
74 74 77 76 79 82 84 87
23 23 25 27 26 23
94 94 95 98 95 96 97 97
70 70 68 70 74
2 2 1 2 8
46 46 48 48 51
69 69 72 74 77 79 79 77
49 49 52 54 57 57 57
28 28 29 29 33
51 51 53 56 56 59 61 67
27 27 29 33 36 39 42
29 29 30 34 37 38 41 39
34 34 35 36 40 42 42
22 22 26 28 32
7 7 10 14 20
35 35 38 39 46 48
23 23 24 26 29 36 35
27 27 29 35 35
61 61 66 69 70 74
26 26 32 34 36 43
41 45 46 48 49 51
5 9 11 13 14 16 17 15
72 76 79 81 83 86 87 87
64 68 69 72 75 76 79 83
27 31 33 36 37 40 46
85 89 92 93 94 91 92
65 69 66 67 68 70 72 71
84 88 91 94 93 93
78 82 79 82 83 84 86 90
15 19 20 19 24
41 45 48 50 53 53 56 59
27 31 32 32 31
84 88 88 90 90
8 12 12 13 17
84 88 89 89 95
58 62 64 68 69 71
1 5 9 12 15 14
57 61 62 65 68 69 73 73
1 5 9 10 14
46 50 53 57 63
63 67 68 69 74 75 77
55 59 66 68 70 68
6 10 11 17 17
76 80 82 88 89 90 94
73 77 82 85 90
12 18 19 22 24
47 54 55 58 60 62 59
4 9 11 14 14
64 70 71 72 73 77
80 86 88 90 95
61 68 71 68 71 74 76
79 85 87 84 85 88 86
51 56 57 55 58 58
37 42 41 44 45 48 50 54
74 79 76 78 80 82 88
61 66 66 67 70
37 43 46 49 49 48
77 82 85 86 88 91 91 91
26 33 33 35 36 37 39 43
42 49 49 52 58
39 44 47 50 52 56 58
36 41 43 44 47 48 52 51
42 49 50 54 54
63 70 73 75 77 81 85
74 80 84 87 93
75 80 83 86 93 94
4 10 13 14 19 21 20
65 72 75 80 83 86 89 89
64 70 73 74 80 81 82 86
20 25 30 33 38
57 56 54 51 48 49
88 87 86 83 83
55 52 49 48 45 42 40 36
59 56 54 53 50 49 44
28 26 25 22 21 20 21 19
10 9 7 5 7 10
44 42 40 43 43
50 47 50 48 47 44 43 39
79 76 78 77 74 69
32 29 29 27 25
30 29 26 23 20 20 22
61 58 58 56 55 54 51 51
80 77 76 76 72
56 54 51 51 44
64 61 58 56 55 51 50 47
28 26 25 21 20 18 16 19
94 93 91 89 86 82 82
76 74 73 70 69 65 64 60
76 75 71 70 63
66 63 62 57 56
55 53 50 44 47
53 52 49 46 44 42 37 37
66 64 63 57 53
41 39 37 36 33 28 26 21
21 24 21 19 17 14
67 70 68 65 64 62 61 62
52 53 52 49 49
85 86 85 84 83 81 77
30 32 29 27 25 20
77 80 81 80 77 76
96 99 98 95 92 94 96
87 88 91 90 90
63 65 64 63 66 65 61
76 78 77 75 76 70
50 51 48 48 47 46 45 44
73 76 75 75 78
56 57 56 56 55 54 52 52
53 56 54 54 51 49 47 43
64 67 67 66 60
56 58 55 53 52 48 45
44 45 44 41 37 40
15 17 16 12 12
58 60 58 57 54 50 47 43
52 55 51 48 41
83 86 81 78 77 75
46 47 45 44 43 37 40
59 60 53 51 50 48 48
23 26 25 24 23 17 13
54 55 48 46 45 43 41 34
14 14 11 10 7 5
80 80 78 75 74 72 69 71
63 63 62 60 58 58
65 65 64 63 59
98 98 95 94 92 89 87 81
97 97 98 97 96
95 95 97 96 97
45 45 44 42 40 38 41 41
6 6 7 5 1
22 22 23 22 17
47 47 46 44 44 43
23 23 21 21 20 19 21
30 30 27 27 24 24
82 82 82 81 77
51 51 49 49 48 46 41
16 16 13 9 7 5 4 1
82 82 78 77 75 73 76
89 89 87 83 80 80
64 64 61 57 55 51
59 59 55 54 52 50 44
36 36 30 28 25
33 33 30 29 23 20 23
13 13 7 6 6
51 51 48 47 41 39 35
92 92 86 84 82 81 78 72
97 93 92 89 88 85 83
58 54 52 50 49 47 49
42 38 36 34 31 31
86 82 80 79 76 75 71
92 88 87 86 84 77
55 51 48 47 45 48 46 45
40 36 37 35 36
20 16 15 12 15 12 12
51 47 48 45 42 38
83 79 77 78 76 75 69
27 23 21 18 15 15 13 11
80 76 74 71 70 70 73
78 74 72 72 71 69 68 68
29 25 24 24 21 17
67 63 61 61 55
98 94 90 87 85 83 82
98 94 90 87 86 87
44 40 36 33 33
96 92 90 86 82
49 45 42 38 31
70 66 65 58 56 53
49 45 42 41 39 32 33
37 33 32 27 26 25 25
34 30 29 27 25 24 18 14
26 22 19 18 13 12 5
59 53 51 49 46 43
28 21 18 16 14 11 9 12
21 16 15 12 11 11
28 22 21 20 17 14 10
49 43 40 37 31
14 7 6 8 5 2 1
42 36 34 32 35 37
49 42 41 43 40 39 38 38
61 54 57 54 53 50 47 43
97 90 92 91 89 86 85 79
36 29 27 25 25 24 21
28 23 23 20 18 16 17
33 27 26 26 23 20 20
90 83 83 80 76
34 28 28 25 22 17
61 54 50 47 46 44 43 42
22 16 13 10 7 3 5
73 68 64 63 63
44 37 36 32 30 29 25
85 79 78 75 71 65
64 57 52 51 50
54 47 42 39 40
88 82 80 77 71 71
61 55 54 49 45
94 89 88 82 76
43 40 37 34 31 28 27 30
21 25 28 32 34 35 33
54 57 59 58 57 55
27 31 33 35 39
10 14 16 16 17 18 22
66 69 70 69 72 74
21 27 29 31 34 41 45
44 45 51 53 56 59 60 64
73 74 71 65 62 61 62
54 51 49 46 42 39 34
81 83 82 75 72 70 66
58 57 60 63 63 65 63
72 71 68 64 64
89 83 77 74 74
42 45 48 52 51
16 16 18 18 22
62 69 72 75 76 76 77 80
10 10 13 13 18
53 59 62 64 64 65 67 71
73 70 68 66 67 65 61
95 92 89 87 85 80 79 78
2 2 3 9 9
77 76 71 70 66
46 42 41 41 39 36 32
57 58 57 53 50 50
82 78 77 75 73 67 68
71 69 73 76 77 75
58 64 65 67 66 68 71
95 91 88 86 82 83
38 38 35 32 32
39 42 45 48 50 54 56 61
82 88 91 92 90
51 47 45 42 41 39 37 38
86 88 88 86 84 83 83
62 62 58 56 54 54
65 58 55 54 53 49
90 86 85 82 79
34 37 35 33 32 31 24 24
93 89 86 89 91
29 36 37 44 47 44
32 35 33 32 29 26 25 22
47 43 42 38 38
80 82 83 82 82
8 8 9 10 11 14 16 18
16 14 17 19 20 21 28 25
27 30 29 26 22
65 64 61 60 57 53 51
13 20 22 26 26
47 42 41 39 37 35 33 33
45 47 53 54 55 60
66 62 60 58 55 56 54 50
63 67 69 73 75 78 79 79
4 6 7 10 12 9 10 14
32 27 24 20 17 15 10
39 39 38 36 35 37 33
63 65 67 64 67
24 24 22 23 22
13 20 21 22 26
27 27 24 22 21 21 18 20
26 29 31 32 34 33
76 76 75 74 71 68 64 62
10 10 12 10 9 10
47 40 37 36 34 37
48 48 46 45 42 42 37
58 58 57 51 48 42
23 19 17 14 7 4
64 57 55 50 47 46 49
59 62 60 57 55 52 50 52
55 50 50 47 45 39
69 65 63 65 64 63 62
55 56 54 50 48 47 50
20 20 15 12 10 9
38 37 37 40 41 44 46 46
65 68 70 67 68 68
5 7 13 16 19
72 71 76 79 85
86 81 78 75 73 76 73 67
80 74 73 70 72 73
71 67 60 59 58 55 52 52
56 60 62 61 64 66 67 71
79 74 71 67 65 64
41 37 33 32 25
96 90 88 86 80 78 76 72
47 44 46 49 48 50 53
12 19 23 24 27 28
95 97 95 92 89 83
47 44 46 49 50 57 58 58
63 67 70 70 68
34 30 27 26 19
19 23 28 31 29
46 53 54 58 61 66
14 17 14 11 11 7
77 77 75 74 73 71 68
61 61 63 67 72
59 55 53 50 47 45 45
93 91 92 89 88
55 48 46 47 45 43 40 40
52 46 45 42 38 34
76 73 72 69 65 63 64
45 45 43 41 42
69 69 66 63 59 56 52
34 40 41 44 47 50 50
42 42 45 52 55 57 64
64 68 70 73 79
66 60 59 56 53 53 50 46
51 50 52 54 56 57 61
52 59 62 62 63 66 64
84 84 85 88 91 94 97 97
57 57 60 59 58 58
25 22 19 20 21 22 26
67 65 63 61 58 57 56 50
61 61 62 66 68 71
86 79 77 75 76 73 69
2 3 6 6 8 10 7
17 22 24 27 32
17 17 10 9 6 5 7
73 69 72 71 65
21 17 15 13 15 12 11 11
28 31 34 38 42
57 57 56 53 50 48 48 44
71 69 70 71 72 73 74 81
2 6 6 7 9
7 11 12 15 16 16 18 18
24 20 19 18 16 11 9 5
85 81 79 77 75 73 69
23 24 27 29 30 32 32 32
36 29 26 26 24 21
6 5 8 11 12 12 15 17
14 9 7 6 6 6
28 25 22 22 21
74 75 73 71 73 71 67
46 50 51 56 58 61 62 64
16 23 25 29 32 34 35 39
37 37 43 45 42
26 26 32 34 38
11 11 13 14 15 18 18 19
75 77 74 70 67 63
68 74 71 73 76 79 82 87
69 69 71 70 67 61
77 80 81 81 85
36 39 36 33 33 32 29 30
18 20 23 23 25 26
80 86 88 85 89
22 21 18 16 13 13
64 64 63 61 56
25 23 24 24 27 33
16 16 17 19 18 19
62 58 58 57 55 54
20 25 27 32 32
38 33 32 31 28 26 20
77 76 75 73 70 63 63
44 49 50 56 57 58 60
48 53 56 58 60 60 63 63
65 60 59 58 58 57 59
35 36 38 39 42 49
17 13 11 11 8 8
67 71 75 78 84
81 81 82 85 87 90 91 95
69 69 72 74 77 80 86
59 58 57 57 59
57 60 61 64 67 66 71
59 58 61 64 65 67 64
51 51 53 56 53 53
24 26 27 31 33 34
26 27 30 32 35 35
82 85 83 82 79 76 76 69
60 56 54 52 51 45 42 35
20 13 14 11 10
73 71 68 67 64 61 57
28 29 28 24 18
54 47 45 39 38 35
41 43 46 50 53 53
32 36 38 44 47 54
17 16 16 15 11
50 51 48 48 46
54 52 53 51 56
21 25 27 30 32 30 36
79 77 79 80 80 84
18 19 18 17 14 13 13
8 15 16 18 20 20 26
42 42 44 48 49 49
44 37 34 31 30 26 25 25
76 80 81 82 88 92
27 27 22 21 18 15 15
26 26 25 19 17 13
35 32 34 32 31 25
37 41 43 50 50
19 18 16 11 8 6 8
18 21 19 13 6
57 58 56 53 51 47 46
58 57 54 51 52 52
73 72 75 81 84 88
14 13 18 20 21 24
65 65 62 61 59 59 59
76 80 80 83 85 88 91 97
89 85 81 80 77
23 23 23 26 27 25
71 69 70 69 66
29 31 36 37 40 43 45 45
77 74 71 71 71
44 47 44 41 44 39
69 74 77 79 78 75
55 55 57 60 63 62 66
74 73 71 69 69 66 59
25 21 20 17 16 13 13 14
26 30 31 29 31 33 33
37 41 44 45 48 52 53
67 67 68 65 72
76 76 79 77 79 80 83 82
28 30 33 35 33 31
48 54 56 57 61 62 59
31 26 25 24 22 20
10 11 13 13 20
3 3 7 10 12 14 18
75 79 76 79 80 81
16 21 27 29 31 33 35 40
24 20 19 18 18 17 10
90 93 90 83 82 80 79
37 35 33 30 29 27 26 24
20 17 15 13 11 10 9
1 2 5 6 9 11 13 15
42 44 46 48 50 52 54 57
40 38 36 34 31 28
24 23 20 17 16 15 13 12
78 77 75 72 71 68 67
65 66 69 71 74 77 79 82
65 64 62 59 58
70 67 66 64 62
23 21 20 19 16
26 29 30 33 35 36
50 48 47 45 44 41 38
9 12 13 15 17 18 20 21
43 41 40 38 37 34 32
24 23 21 19 16 13 10 9
93 91 88 86 83 80
37 34 33 30 29
36 33 30 29 28 26 23 21
84 87 90 91 94 95 96
57 55 52 51 50 49 47
83 86 87 88 89 92 94 96
56 58 59 62 63 64 67 70
62 65 66 68 69 72 74
52 54 57 59 60 63
46 43 40 39 37
70 69 68 65 63 60
72 73 76 78 79 81
23 24 25 26 29
69 66 65 62 59
49 50 53 54 56 58
39 40 43 44 46 49
50 48 47 45 42 41
21 18 15 14 13 11 8 7
66 68 69 70 72 75
64 61 59 57 55 54 53
22 25 26 29 30 33 36
35 38 41 43 46
22 21 19 17 14 12 10 7
35 33 30 28 25 24
81 79 76 75 73
48 45 42 41 38 37
24 25 27 29 31 32
18 21 22 24 26 28 31 32
21 24 25 26 29 30 32
87 85 83 81 80 77 74 71
35 32 29 27 24 22 19 16
89 91 92 93 96 97
37 35 34 33 32 31 29
84 81 80 77 74 71 69
38 35 32 29 26 25
93 90 89 87 84 82 80 78
88 85 83 81 79 78 76 73
2 3 5 6 9 11 14 17
31 30 27 25 23 20
95 92 91 89 87 85 82
6 7 9 12 13 15 17 20
48 45 42 41 40 39 36 35
76 73 72 69 66 64
82 80 77 75 73 72
67 69 71 72 75 76 78 81
1 2 4 6 9 12 13
21 20 19 16 13 11 9 8
42 39 38 37 34 32
21 22 25 27 30 33 36
57 56 55 54 53 51 48 47
37 35 33 30 27 25 23
14 17 18 21 23 26 27 29
43 45 48 50 51 52 53 55
15 14 13 10 8
17 18 21 22 25 26
13 10 9 8 6 5 4
84 86 88 91 93
91 90 87 84 83
35 32 30 29 28 26
56 59 61 62 65
20 22 24 27 28
32 33 35 36 39
48 49 50 51 53 54 56 58
60 62 64 67 69 71
25 22 19 17 14 12 11
25 28 30 31 33 35 37 38
56 54 51 50 47 46 43
31 32 33 35 38
59 58 56 54 52 50 47 46
86 89 90 93 94 95 96 99
95 93 92 91 88 85
65 64 63 60 58 57 54
74 76 77 80 82
76 78 79 81 82
12 11 10 7 6 4 2
90 87 86 83 82
16 13 12 11 9 8 7
41 38 36 35 32 31 28 26
43 45 46 48 51 52 54 55
94 91 88 85 82 81
77 74 72 69 68 66 65 63
30 32 35 36 37 40 42
82 83 85 87 88 90
67 64 62 60 59 57 54
92 90 89 88 87 84 83 82
21 22 25 27 30
63 65 68 69 71
6 9 11 12 13 16
92 89 88 86 83 80
92 91 89 87 86 85 84 82
18 16 13 11 9
52 50 47 44 41 39 38
10 11 13 15 18
46 44 41 39 38 37 34
27 30 31 33 36
65 67 69 72 73 75 76 77
40 43 46 47 50
88 85 82 79 77 76 74
87 89 91 94 95
88 86 83 80 79 76 73 70
41 43 45 48 51 52 55
87 90 91 93 95
79 82 85 88 89 91 92
7 10 11 14 16 17 19
46 47 48 50 51 52
95 93 90 88 86 84 83 82
68 70 71 73 76
80 79 76 73 71 69
80 83 84 87 89 90
94 93 92 91 88 87
85 82 80 77 74 71 68
32 29 28 25 24 22 20
45 42 40 37 35 33
51 48 47 44 41 39
33 36 38 41 42 45
84 82 81 78 76 75 72 69
24 25 28 29 30 32 33 36
75 77 79 81 82 85 88
2 5 6 9 10
73 75 77 80 82 84 86
69 68 65 62 59
82 81 78 77 75 74
69 71 72 73 76 77 79 80
78 80 82 85 87
95 94 91 90 88 85 84 81
65 68 70 71 72 75 77
80 81 83 85 86 87
42 39 36 34 31 29
82 85 87 88 90 91 92 93
44 41 40 37 36 35 32
71 69 67 65 62 60 58 56
92 89 87 84 81 80 77
31 30 28 26 23 22 19 17
14 16 19 22 23 26
84 86 88 90 91
37 34 33 32 29
75 76 79 82 85 86 87 90
63 66 69 70 73 75
26 27 28 31 33 34 37 39
46 43 40 37 34 32
28 26 25 23 21 19
67 65 63 60 57 55 52
33 35 36 39 42 43 45 46
58 55 52 49 46 45
99 98 97 95 92 90 88
27 30 32 35 36 39 41 43
59 58 57 56 54 53 50 47
31 29 27 25 24 22 21 18
35 33 32 29 28 25 23 20
66 65 62 60 58 56 53 50
50 51 54 55 58 61
71 68 65 63 62
47 48 51 53 55 58 59 61
10 12 14 16 19 21
33 35 37 38 39 41 44 45
94 92 91 90 89
10 12 15 17 19 22
83 86 87 89 91 93 95 98
27 24 22 21 18 15 13
97 95 92 89 88 87
20 21 24 25 28 29 31
72 71 70 69 67 65 64
65 62 59 56 55 52 51 48
79 77 75 72 71 69
70 67 65 63 61 59 56
9 10 12 14 16 17 18 21
9 10 13 15 17 19
49 50 53 56 57
51 54 56 57 58 61 63 66
86 88 90 92 93
37 38 40 42 43
32 33 35 37 38 39
77 75 72 69 68 65 63 60
10 13 15 17 19
29 31 34 35 36 38
61 63 64 67 69 71 74
86 84 82 81 79 76 74
51 48 47 45 44 42 39 37
37 39 42 45 46 49 50
54 57 59 60 62 63 65 66
43 45 48 49 51 52
57 56 55 54 52 50 47
13 15 18 19 20 23 26
4 7 9 12 13 14
24 23 20 19 16 15
53 52 50 49 47 44 43
11 13 15 17 20 22 24
27 26 24 23 22 20
4 5 6 9 11
26 23 21 19 17 14 13 10
34 35 37 39 41 44 46
59 61 63 65 68 71
50 47 46 44 42 41 39 36
23 20 17 15 13
28 25 23 20 17 14 12
2 5 7 10 13 16
16 18 19 20 23 25
5 6 7 8 11 14
44 47 48 50 53 54
43 42 40 39 36 35 34 31
57 59 61 62 65 66 67
37 36 35 33 30 29 28 26
80 79 78 76 73 70
93 92 90 87 86 84
54 52 49 47 46 44 43 41
27 25 22 19 18 15
76 78 80 81 83 85
79 77 74 71 69 67 66
29 28 25 24 21 18 16
2 3 6 9 10
12 9 6 3 2
55 58 60 61 62 63 64 66
16 17 18 20 21 22 25 28
62 63 64 66 68 71 74
17 20 21 23 26 27 29
22 19 18 17 16
44 47 48 51 52 54 56
36 38 41 42 44 46 48 50
28 27 24 23 20 19 17
20 17 15 13 11
65 64 61 60 58 55
49 46 44 43 42 39 37 34
75 73 72 71 68
50 51 53 54 56 57
73 72 69 68 66 63 61
44 45 48 51 52 53
66 65 63 60 59 57
48 49 50 51 54 57 58 59
71 74 77 79 82 84 86 87
60 58 55 53 51 49
12 14 15 16 19
35 36 37 38 40 43 46
20 19 18 17 15 13 12 9
92 89 88 85 83 81
14 15 17 20 21 22 24 27
74 76 78 79 80 82 83 86
61 58 55 52 50 49 46
48 49 50 51 54 57 58 60
86 87 88 90 93 95
49 47 44 41 39 37
10 9 8 7 5
78 80 81 82 83 85 88 91
51 50 48 45 44 41 40
52 50 48 46 44
88 89 90 91 94 95 96
91 89 87 86 84
26 24 23 21 20 18 17
61 60 59 58 57 54 51 50
20 23 25 28 30
39 42 45 46 48 51
49 51 53 55 58 61
20 22 23 24 25 28 30 33
50 52 54 56 59
83 82 81 80 78
66 63 62 60 57
60 58 57 54 51 48 46 45
86 87 90 92 93 95 97 98
14 16 17 19 21
42 41 40 38 35
63 66 68 69 71
78 79 81 84 85 86 87 89
18 17 16 13 11 8
66 68 71 74 77 79
79 81 84 87 88 91
45 46 47 48 50 51
25 26 29 30 31 32 35 36
59 60 63 64 66
89 86 85 83 80 77 75
31 29 27 26 23 21
29 31 34 37 38
78 79 80 82 84 86 89 90
66 64 63 61 58
53 56 58 59 62 64 67 68
14 11 8 7 4
57 59 61 63 65
30 29 27 25 24
29 27 26 23 21 19 16
38 37 36 33 30 28
19 21 24 27 29 32 33 35
69 68 65 64 63 61 59
84 83 82 81 80 79
10 12 14 16 18 21 24
40 41 42 44 47 50 52
30 29 28 27 24 23
62 60 59 57 54
53 52 50 49 48 45 44 41
28 26 25 22 20
64 61 58 55 54 53 51
63 65 66 69 70
52 50 49 47 44 43 40 39
25 27 28 30 31 33 36 37
87 89 92 93 94 96 99
94 91 88 87 85 82 79 76
66 64 63 61 58 57
60 58 57 55 52 49 48
2 3 6 8 11 12 15
34 33 31 30 29 26 24
70 71 73 74 76 78 79
19 22 23 26 29 31 32
68 69 70 72 74 77
73 71 69 68 65
23 24 27 29 32 33
57 56 55 52 51 50 48 46
20 22 24 26 27 29
78 81 84 87 89 91 94
74 75 78 79 81 84 87
48 47 45 44 41 38 35
33 34 37 40 43 45
74 76 79 80 82 84
15 17 20 21 22 25 28 29
7 10 12 14 15 16 19 20
51 48 45 42 39 38 37
1 4 7 9 12 14
82 81 80 78 75 74 73 72
39 37 36 34 32 29
9 11 14 16 18 20
8 9 10 11 13 15 17 20
20 22 23 25 28 29 30
87 84 83 80 79 77 74 72
50 52 55 57 60 62 64 67
75 72 71 69 66 65 62
35 33 31 29 27 24 22
78 79 82 84 86 87 90
16 15 14 11 9 8 6 5
56 58 59 61 64 66 69
37 35 33 31 30
14 16 18 19 22
14 15 18 21 22 25
83 84 86 87 90 92 95
78 80 81 83 85 86
3 4 5 8 9
68 70 73 75 76 77
65 63 62 59 56
18 19 20 21 24 27 29 31
45 47 49 50 53 55 58
45 43 41 38 35 32 30
53 54 55 57 58
90 88 86 85 84 81 78
6 8 10 11 14 15
18 21 23 26 29 31 34
51 50 47 46 43 41 39 37
82 81 78 75 72 71 68
98 95 94 93 90 88 85
20 19 16 14 12
11 14 16 18 19 22 24 27
29 27 24 23 22
19 18 16 13 10 7 5 4
44 41 38 36 34
45 44 42 40 39 37
38 36 35 32 30 29 26
27 28 29 30 33 36
68 69 70 72 73 74
89 90 93 94 96
44 42 41 39 38 35
85 82 81 80 77
32 34 35 36 37 39 41
44 43 42 40 37 36
84 82 80 79 78 75 74 72
40 42 45 48 49 51 52
77 78 80 81 82 84 87 90
37 40 42 43 46
92 90 88 87 84
37 39 40 41 44 45 46
72 75 78 81 83 86 88 91
66 67 69 70 73
40 41 42 44 45
92 90 87 86 83 82 79
33 34 37 38 41
75 77 78 81 83 84 87 90
66 65 63 60 59
69 68 66 65 62
68 71 73 75 76
79 82 85 87 90
61 58 56 55 54 52
6 7 9 12 13 14
25 24 22 20 18 17 14 13
48 51 52 53 56 59
50 48 47 46 43 41 39
3 5 6 9 10
44 42 40 39 38
47 46 43 40 39
24 26 29 31 34 37 40 41
13 15 18 21 22 23 25 28
52 51 50 49 47 46 45 43
48 47 44 42 39 36 34
60 58 56 53 50 49
26 23 20 17 16 15
77 74 72 71 68 67 65 62
9 10 12 13 16 17 19 21
51 54 56 57 58 59 60
54 57 59 61 64 65
35 38 40 42 44
37 38 40 43 45 48
37 38 40 43 45 47 48
80 81 83 84 87
35 37 40 41 43
80 78 75 74 71 68 66
46 48 49 52 53 55 56
53 54 57 58 59 61 64 67
51 54 56 59 62 65 66 67
21 24 26 27 28 30
27 26 24 22 20 19 16
19 21 23 25 28 29 31 32
10 9 8 7 5 4
32 35 36 39 40 42 44 46
51 49 48 46 45 42
51 48 46 45 43
52 55 56 59 61 63 66
19 17 15 12 10 9 6 5
5 6 7 10 13
46 44 43 40 38 36 33
24 22 21 18 15 14 12
50 53 54 57 59
78 80 82 83 85
14 15 16 17 18 21
37 34 33 32 31 28 26
55 57 59 62 65 66 69
87 90 93 95 96 99
37 39 42 44 45
1 4 5 6 8
24 21 20 19 16 15 13
75 73 72 71 69 67
77 79 82 85 87 90
45 42 39 38 35 33 31
34 31 30 27 25 23
40 39 36 33 30
77 80 82 85 87 90 91
76 74 72 70 67
58 60 63 66 69
43 41 40 39 38
46 44 42 40 39
96 94 93 91 88
90 89 88 86 83 80 77
68 67 66 64 62 60 58
87 90 93 94 95 96 99
30 32 33 35 37
41 44 45 46 47
44 43 41 40 37
16 14 11 9 6
97 95 93 91 89 87
23 21 19 16 15
63 60 57 55 53 51 50 47
60 62 65 67 70 73
6 8 10 11 12 15 16
79 78 77 74 71 70
56 57 59 62 63 66
46 43 42 40 38 37 35 32
87 85 83 81 79 77 76 75
74 72 70 69 66
17 14 13 12 9
74 76 77 78 79 81
18 21 23 25 27 29 32
34 31 29 27 25 23 20
86 84 83 82 80 78 75
41 42 44 45 48 51 54 57
36 34 32 31 30 27 24
42 39 37 36 35 32 30 28
84 82 79 78 76 74
42 40 37 36 35 34 31
57 56 54 52 50 48 46
20 21 24 26 27
37 40 41 44 46 48 50 51
28 29 30 31 34
12 14 16 18 21
69 70 73 75 76 77
40 39 36 34 32 30 29 26
57 59 61 64 66 69 70
35 36 37 39 42
56 55 54 53 50 49 48
60 59 58 57 55
33 30 29 27 26 24 22
85 82 81 80 78 76 75
67 64 61 60 57 54 52
86 85 84 81 78
47 45 43 42 41
25 24 23 20 19 18 17 15
58 57 54 53 50 49
88 90 91 92 93 96 99
46 43 41 38 35
20 18 15 13 12 9 7
81 79 77 74 73 72 69 67
61 58 57 54 52 49 48
93 91 90 87 85 84 81 79
9 10 12 13 15 18 19 21
66 69 72 75 77 79 82 83
73 74 76 79 80 81 84
61 59 57 56 55
18 15 12 10 9 8 5
85 82 79 76 74
40 38 36 34 33
69 72 74 77 80 82 83 85
70 71 73 75 77 80 82
78 77 75 73 71 70 69 68
3 6 8 9 10 11 14
5 6 9 12 14
60 58 55 54 52 49 48
8 11 14 15 16
65 66 69 70 72 73 74 77
79 82 84 87 88
61 59 58 55 52 51
44 41 40 39 37 34 32
23 25 28 29 31 32 35
33 36 37 39 41 42 44 46
51 48 45 42 41
62 59 58 56 55 52 49
28 30 32 33 34 35 37 40
52 54 55 57 58 59 62
20 19 16 14 13 10 8 5
60 61 64 67 69
71 69 67 66 63
98 96 95 92 90
6 9 12 13 15 18 19 21
35 36 38 41 43 45 48 50
91 88 85 84 81 78 76
83 85 87 90 91 94 97 98
64 66 69 70 71 72 75 76
57 55 52 51 49
15 17 20 23 25
```

## File: input/xmas.txt
```
SXMAXXMSSSMMXAMXAMXMMXXXAXMAAMAXXAMXMMAMXMASXMASXXSMMMAXXAMXAMASXMSMMMAASMSMMMXMASAXMAXAMXSAXXMXXMXSXMXAMXMXSSMXAMXSXMMSMMSMSASXXMXMMMXMMMMM
SAMXSMXMAAAASMSMXSXAXASMSSMSSSXSSSMMSASMXMAMMXMASXMMXSAMMSMAMSAMAMXSAXMMXAAXAMAXSAMXMSXSXMXSAAXAXSMMAMSMSXSASAAMSSMMAMXXAAXXAAAMASMMASAMAAAX
MAMMAXSMSMMMXAAMAMMSMASAAAXAMXAXAAAAXMAMAMMMSAMMAXXAAMASAAXXAMASXMASMMMASXMSMSXXAMXSSMAXAAAXXXMXXMAMAMAASAMXXMSMMAXSAMASMMSAMXMSAMASASASMXMS
SSMMMAXAAXSAMSMMASAAMAMMMMMMSMMMSMMMSXMSMSXXMASXMSMSMSAMXXMXMAXMXSXSXSMASAAXMAXXXXAMAMSMAMMSXSMMASXMAMMXMMMSSXMASAMMASASAAXXXAXMASAMXMAMAASM
AAXAMXMSMMMXMXAMXMXSMMXSXMAXAXXAXXXAAAMAASMMSXMMXAAXAMXAASMXXSAMXMAMAAMXMXMXMAXMMMMSMMAXMAMMMAASAMAXMXSXMXAAXASAMASAXAMXMXMMXXSSMMMXAMXMSMMA
MMSXMAAXMSMMAMAAXAAMASMMASXXXXXSSMMXSMMMSMAXSASXSMSMMSSMXSAASMMMMMAMMMSSMSXXMMSMAAMAXMMSASAAXSMMASMMMAAAAMMSSMMAXSMMXAXAMMSMSSMAMAMMSMSMXMMS
XXSASMSXXASXXMXMMMMSMMAMMMMSAMSAMXAMXXAXMMSMSAMAXXXASAMXSMMMXAAAAMMSMAMAASAMXAAXSSSXSAXAAMXAMXXMAXAAMAXMMSAMXXMXSXXSSSMMSAAASXSAMXMAXSMAMMAA
MMSMMMMMSAXMMAAXAMXMMAXMAAAMAMAASASMSSMXSAMXMAMSMXSSMMSXMAMASMMSSMMAMMSMMMMSSSXMMMMAMMXMSMSSSMSMASXMSSSMASAXXSAMXMAXXAXXAMMXMXSXSSMMSAMXMMMM
AMSXXAAMMSMAAXSSXSAAXAMXMMMXSAMXXAXAMASAMXMSSMXXXMMXSXAMMAMMMAAAAASAMAAAMSMAAMXSAAMSMAAXAMMXAAMXMAAXAMAMASMSAXXMAMAMSMMXXXMASXXMAXAMXMMMMASM
SXSASMSXAXMSSXMAXSMSMAXMAXXSMMXSMMMMSMMXSAXXAMAMSMSAMXMSSMSSSMMMSMMAMSMSASMMMMASMMSAMSSSMSSSMMMASMSMXMXMMSASMMMSMSAASXSMMASASMMSMXSMSMAMSASA
MAXMSAXMMMMAXAMSMMAXXAMSMSMSASAMXAAAAMXMMMXXAMXXXAAASMMAAAAAMSMMXMMSMMAMMMMSAMMSXMAMXAAXAAAXXAMXSAAXAMSSMMXXAAASAXMXXAAASAMAXMAAAXMAMSAMMASM
MXMXMMMXMAMMXAMXAMMMMXXAAAAXAMXSSMSSXXAAAMAMSXSMMSMSAXMSMMMSMSXMASMXXMAMXAAXMXXXAMMXMMSMMMSMSXXSMXMSMXAAXXMSMMXMAMMSXSSXMXSSSMSXMAMAMSMXMMXX
MMXXSAMASXSSXSXSXMMAMASMSMSMXMXXAAMAMMSSMMSSMAAXAXMMXXXAMXAMMSASAMXMMXSXSMSSSSSSMMXAMXAMAXAAMXXSASXSMMSSMAMAAMMMXMAAMXAMXXXAMXMMSSSMMXSXAXMM
XXMASASXSAMXXMAXXMMAMMMAAAAXAASMMMMAMXXAAXMAMSMMMMXAAXMMMMMSASAMXSAXXAMAMXXAAAXAAMSMMSASMSSSSMAMAMAXMAAAXMSMXSAMXMXSSMAMASMASMXMAXAASASMMMAM
SMAAMAMXSMMMMMAMSXSMSAMXMSMSXSAAXAMAXAXMMMXAMXXXSMMXSXSAXSAMAMSMASAMAMSAMXMMMMSSMMAAMSMMAAMMXAAMAMXMMXSSMMXAASAMMMMXAMMMAXMXAXAMMSMMMXXASASA
AASMSSSXXXAAMMMSMAAASAMXMAMAMXMXSSSSSXMAASXMXMXMXASXMAMXSMAMXMXMASAAXMAMXAAXAXAMXSMSMSAMMMXMMXMSMMSASAAMXMMMMMASXAMSSMMMSSXMASMMXAMASXSMMAMX
MMXMAMXAXSSSSXMAMXAAMMSXMXMMAXMMXMAXAASXMSASXSAAXMMAMXMMMXAMASXMXSXSSXASXSSSMMMSAXAMASXMMSSMMSAXAMXAMMSMMMXAASMMMAXAMXSAAMAXXSXSXMMMSAAAMAMX
XMMMXSMSMAAAMXSXSSMSMXMAMXSSMAMAAMMMSMMAMMAMASXMXASMMMMAASXMXXAMMMMAMAXXXMAMMSAMAMXMAMASAAAASMXMASMXMXAXXSSMMSAASMMXXAMMSSMMXMASASXMMXMMMASM
AMASMMAMMMMMMMMAMAAAXAMAMAMAXAASMMSAMXSAMMAMXMASAMXASXSMMAAMSSMMAMSAMXMSAMXMXMMSMMSMMSAMMXMMMAXMASXXMSMSXMASAXMMMAMSMAXAMXMAMXASAMAXAMXAXXXA
XAMXAMAMAMASAMMAMMMMSASMMXSSSMXAMXMMSASXSSSXSAMAAXAAXAAXSMSMAAMSMMMXMASXMMXMAXXMXAXAXMASASXXSXSMASMSAAAMMMMMXMAAXAASXXMXSAXMAXXXASAMXSSMSMSM
MXXSXMXSXSASASXMMSAMMXAAXAMXAMSMSMSXMAMAMAMMSAMASXSSMAMMXXMMSXMAAAMMSMSASAAMMMMSMMSMMSXMASAASAXMXSASMMAMSXSAMXMMSMASASASMMSXSSSSXMAMMMMMAAAX
ASMMXSAMXMASAMMMAXAXMXSXMXMSAMAAMAMXMAMMMAMASAMAXAMXAAAMXSMAXASXMXMAAAXAMSXMAASAAAMAAMXMAMMMMAMMMMAMAXMAMAMAMAAAXMAMAAMXAASMAAAXXSAMAXAMMXMX
MXAAASXMAMMMMAAMMMSMMAMSMAMMMMMAMAMXXMSXMSMAXXMAXAMAXMAXAXMASXMSAAMSMSMAMAMMSMSASAMMSSXMSSMAXMMAMMSMSMXAMMMAMSMMXXSMSMMSMMSAMMMMMSXSSXSMXSSM
XSMMXSXSASMMSSXSXAMSMXSAMASAMSXSSMMSAMMMMXMMMXMMXAMSSSXMSSMMXXAMMMMAAXMAMAMAMASXMAXAXXXMAAMXMASXMXMAXMMASMMXXMASMXXAMXMAXXXXMMMSXMASXMMSMAXA
XXXMAMASASXAXMAMMMMAMMXMSAXASAAAXAASAMAMXSASMSASXSXMAMAXMAMXAMSMMAMMXMAMSAXXSAMMSXMMSXSMSSMSMAAAASMMMSMASXSAASAMAAMMMSSMSAMXSXMXAMMSAMAAMMMS
SASMASAMXSMSMAASMXSAMXAXMXSMMMMMMMMSAMXSAMSAAMASMMAMSMMXSAMMMXAAMAMMXMXXMMSMMASXMAMMMAXAAAAMMAMXMSAAAAMXMAXMMMXAMXSAAMAMXXSAMXXSXMXMAMSXXMAM
AAXSASXSXXAAXSMSXAMXSXMMAAMAAXAXAMAMASAMXMMMXMAMMSAMAAMMSXMAMXXMMSAMAXASXAAASAMAXXMAMSMSMMSMMASAAXMMSMSAMXMXXASXSMSMMSAMMXMAMXASMMASAMASMMSX
MMMMMSAMMMMMXMAXMMMXMMSMMASXMSMSXMASXMASMSSMAMMSASAMMXMAMMSASXSXAXASXSAMMSMMMMSSMSSMMXAMSMMASASMSMXMAMXAXAMXMMSAAASXMSAXSAXMSSMXASAXAXAXMAMS
XASAAMAMMAMSXMAMAASMSAXAMASXMAMSMMAXASXMAAASMSXMMMXMASMMXAMAMMAMXSAMXMXMAMSMSMAMXAAAXMAMMXSMMMSAMXSMMMMMSSSXMAMXMMMAXSXMXXSXXAXMXMMSSMMSMAMS
SXSAMSXMSSSMAXSSSXSAMMSSMAXASMMSAMSSMMMMMSXMXAXMSSMMMAAXMXMXMSAMMMAAXMAMSXAXAMASMSSMMSXMAASAXXMAMMXAAAXMAMXXMASAXAXMMMMSMMMXMXMXAAAAAMAXMMXX
SMMXXSAMXMAMXMMAXAMXMXMAMAXMMSAMMMAAXMAAAMASMMMAAXAAXMAMSMSSMSASXSSMXSMSMXMMXMAXXMAMXXAMMMSAMMXMXMSSMMMAASXXSXXMXXSMSMAAAMASMSMSMSXMASMXXSSM
MAAMMMASASAMXMMMMXMAXXSMSSSMAMSMXMSSMASMMSAMAXMMSSSMSMMAXAXMAXAMXMASAMXAXAMSAMAMSSMMXSMMSMXAMSAMAXMAMSASMSMMMSMMSMSAAMMSSMAMMAAAAAAXAAAXAAAA
SMMXASMMAMXXAXAXMXSMSXSXAAAMAMMSMXAAXAAAXMXSSXAAAAAAXASMMMMSSMMMAXSMSSMMSMAAAMAMXAAXMASASASMMXASXSSSMMMMAMXAASXMAAMSMMXMXMMSSMSMSMXMASMMMAMS
SASXXSAMMMMSMSXSXAAXMAMMMXMMMMMAMMMSMMXXMSXMMASMMSMXMAMXAAAAXAASMSXAAXAXXMAXXSXSXSXMAMMMSMXSASXMAXMAAAXMAMXMXXAMMSMMMSAMMSMAAMMMXMAMXMXMMAXX
SAMXXXAMAAXAMSMMMSSMMAMAAXMXMASAMSAMXSMSAXMAAXMAMXXMASMSMMMSXMMAXSMMMSSMXMSSMSAMAXASXSAXXXASXMASMMSSMMMSAMASMSSMXXMAASASAAMSXMMMAXMSMXXMAXSM
MAMMASXSSXSXXXAAMMAMSASMSMMASAMAAMXSMAAMMMSSMSSXMXXMAMMASAXMXSMSMSSMAAAMXAAAMXAXMAMSASXSXMAXAMXMSAMXMAXXMAMXAAAMMSXMXSXMMSMMXAASMMSAXMMSSXAM
SAMMAAMAMAAXSSSMMMAMAAMAAASMMSSMMMAXAMXMXAAXMAMAASXMAMSASXSMMSAAXMMSMSAMMAMXMSMMSSMMMMMMAMSSSMSAMXSASXSASMXMMMXAAXASAMASXMAMSSMXXMXAXXAAAMXM
SXXMMXMAMMMMMAMMXSMMMMMMMXMSAAXXAMSSSXXSXMASXASMMAAMXMMASAXMAMSMMMAXMMAXSXSSXMXAAMXMAAAMXMAAAMMMAXXXMAMAXMASMSSSSSMMASAMAMXMMASXAMMSMMMMSASX
SXXXMXMXSAAAMAMAXSAAAASAMSAMMMMMXSMAMXMAXMAMMMSASMSMXXMXMMMMAXMMMMAXXMSMXAXXAMMMMSASXSSSXSMSAMAMAMMAMXMMMMXMAMAMXAXMMMMSSMMMSAMXAMAMAXSAXMMM
SXMASAMMSXSSSSSXMSMMMMMASMXMSASMSSMAMMAMMMASAMXAMAAXMXMAMXAMXXMAAXXSSXMMMMMSSMMAXSXSAAAXAXMXMXAMAXSASXSSSMSMMMMMMAMAAAXXXAMXMMMSSMASAMSAMXAM
XAMAAASXMAMAAAAXXMSMXSMMMAMXSASXAXXAXAMXXSASXSMSMSMMMMSAMSXSSSSSMSAAAMAAMSXMAMMMXSAMMMXMMMMASMSSSXMASAAAAAXXXAAMSXMSXXMAMXMAMSAMXSASXMMAMSSS
MXMXXSMAMSMMMMMMSMAMAMASMSMAMAMMMSSMXSAMXMASAMAAAAMAAMXSMSAMAAAAAAMMMSSXXSMMAMASAMAMAMAXMAMXMSAAMXMXMMMSMSMMSSSMSAAXASMSMSMAAMAXAMXSAMMMMXAX
MAXXSAMSMMASXMSAMXAMAMMMAAMXMAMMXMASAXAMAMAMAMSMSMSSXXAMXMAMMMMMMMSXXAMMMSASASAMXXAXASASMMSSSXMSMSSSXXMXAXXAMAAAMMMMAMAASAMXXSSMSSMSXMASMAMS
SSSMAAAXASAMAAMSXSSSMSSMXMSMSSMSASXMMSMSMXAMXMXAAAXAAMSMASXMAMXSSXMXMAMAAMAMXMASASXSMSMSAMAMXAXMASASAMMMMMASMSMMMAAMAMSMSMSSMAAXMAXMASXSAMXA
SAAASMMMXMAMMXMXMAMAMXAAASAMXAASAMXAAMXSASXSMAMSMSMMMMXAXMAXXSAMMAXAXSSMSSSSXSAMXXXAXMAXAMASMSMMXMAMXAAAMAXAXAMSSSSSXMXAMXAAMSMMSMMSXMAMMSSM
MAMMXMMSMMXXXMXXMMMSMSMMMSASMMMMAXSXMASMAXXAXXXXXMASAMXSAXAMSMASMMMSAMXMMAAAAMXSMSSMMMMMASXSAMMSAMXMASXXSSSSMSXAAMXMMMMSMMSXMAXMAAMMMMAMSAXX
MMXMXXAAAXMAMSMMMAAXMSAAASMMMMASXMAMXXXMAMSXMSMSASASASAMSMSSMAAAAXAMMASMMMMMMMMMAMAAAAXSXMXMXMAXXSASMMSMMMAMAXMMSMAMSMAAXMMXMAMSSXMXAMASMXSS
SXASMMSSSMAAMAAAMMMSASMMMXXSASXSAAAAXMSXSMSMAAAMAMXSAMASAMXAMMMXSMSSMASAAXXSXSXSXXAMMSXSASXSXMXSAMXSAAXMAMAXMMMMAMASAMSSSXMAXSAAMAXSSSSXMXMA
MMMSAAAAMMSMSAXMXAAMAMXSAMXSASASXMXSAAMXMASMSMSMAMAMMMXMXXMAMXSAAAAXMAXMMMMMASAMASMMMXXMASAMXXMAMMMSMMSXMSMMAAXSASXMAMXXMASXSMMASMMAXXXASMSS
XAXXMMMXMXAXXMASXMXSASMXMAMMAMMMXMAXMSMMMXMXXAAXAMASXXXAMXSSMAMXAMXSMXMAAXAMAMAMAMAAMSMMAMXMAMSAASAXMASXAAAASMMMXMAXSMAMMAMXAXMXMXAMXMXSMAXM
XMSMXXXASMMSXSAXAAXMAXXMAXXMMSXMAMMSXXMASXSAMXMMMXAXMMMXSMAAMXSMMMMMAASXMSSMASAMXSXMMAAMXMMASAMMSSMXMASMSMSMXAXXXXSAMMMMSSSMMXAAAXMAXAXMMSMM
SAMXSAAXMAXXAMSSMMSMASMMSSXMASASMSAMMXMXSAMXSMMASMMXSAASMMMMMASAASAMMMMAAXASAXASASMMSSSSMSMAMXSXXMASMMXAMXXXMMSSMAMASAXAAXXAXSSMSMMSMSMXAAXM
ASMAXMASMSMMMMAXXAXMAMAAAMAMXSAMAXAXMAMAMXMMMASAXAXAMXXXXAAXMXXXMSASMSSMMSMMMSMMXXAXAAAXAAMXSAXMXMAMAAMSMMMMMXAAMXMAMMMMXXXSMMXMXXAAAAAMSMSS
MAMMSXXXMAXXAAXSMMXMMMMMMMSMMMXMXSAMSMSAMXMASXMAMSMMMSXMSMSSMMSSMSAXAXXXAAAMXAXAMMSMMMSMSMSAMMMMMMAXMXSXAAAASMSSMAMASXSSSSMMASAMSMXSSMXMAAAA
XMXMAMMXAAXSASXMAXASMSSXSAXXMAXXMXXAAMAASAMXSMASMMASAAAMAMAXAAXXAMMMSMSMSSSMSMSXSXXAAAMAMXMMXAAXMSMSMXAXMMSMSAAAXXSASAXAAAMSAMAASAMMAMSMMMAS
MXSMAMXSXMMSAXASXXXSAAAAMMMMMSMMSMMMMSSMMXSXSXAMMXAMXSSSSMASMMMMMMXAMAMAXAMAMASAMAXSMXSAXMASMSSSMAAAMXSXSXMXMMMSSMMMMXMMSMMMAXMMMAMSAMAXSSMM
MMAMXXAMASAMMMXMSAAMMMMMSSXSAAAAMAMSMAMAMXXAXMASXMMMXMMAMMAXAMASXMMSSSMSMSMAMXMAMAMMXAMMMAXXMAAAMAMASMMAMXMASAMAAASXMMSXMAXMAMSASAMXXMAXXAAA
XSSMSMASAMMSAMAAXMXMAXAXAAAMMXSMMAMAMASAMMMSMMAMAMXSXSMMMMSMSAMXAXAAXAAXAMSMSXSXMXSMAMMSMMMSMMMMMXSASAMXMASMMAMXSXMMSAAMSMMSMXMASASMXMXMSSMM
MMAAXSAMXSASASMAMMSSXSMSMMMMXAMASXSMSXSXSXAAAMMSAMXAASAMSXMAMAMSMMSSMMMMSMAXMAXAMMMXXXAAAAXAAMMSAMMXSXMXXAXXSXMAMAMASMMXAMXSXSMXMAXXAXAAXAAS
ASMMMMXSAMXSXMXMASAMASMMXSXSMASASAAASXSXSMSXSMAXMMSMMMAMXAXMSMMAAMAMAAXSASMMXMMAMAMXMMSSSXSSXMAMAMSASMSMMMXMXAMASAMMXAXSMSXMAMSAMXMSMSSSMXMS
XXASMMMMXSAMAAMSXSXMAMAXSMAXMMMAMMMMMMSAMXXMXMAMSAMXXSXMSMMMAASXSMSSXMXSASXMASMSMXSAAAAXAMXMAMMSSMMASMAAAMASXMMASAMXSXMAXXAMSMXMASMAMAAAMSMM
MSAMAMSMAMAMSSMXMXXMXSXMAMMMSXMXMXXXSAMXMAXMMMXAMXSMXAAMAMAMSMMAXAMXXSASXMXMAMAXSASMSMSXMAXXXMAAMAMMMMSSMSASAAMXSXMXAXXSSSXMAMXMAXXXXMMMMAAA
MXASXMAMXSAAMAASMSMXMAXMAMXAMXAXMASMXSXAMXSMASMMSMSMXMAMASAXXMSXSAMMMMAXSAXMAMSMMMSXMXMASMSMSMMXSAMSSMXXMMMSXMMMMMMMMMMAXMAMXAAMMSSMSMSMSSSM
MSMMMAMMMSMSXMMMXAXAAAMSSSMAMMXMASXMAMSMSAXXAMAXXAXMMXMSMSXXAMMMMAXSAMXMSXSMSMMAAXMASASXMAMAAMAXMASAXMAMSAMXXMAMAAAAAXAMXXXMASXSAAMAAAAAAXMX
XAAAAAXAXXAAASMMXMSMMSAAAXMSMMMMSMMSAXAMXMAMMSMMMMMXMAXAMXMMSMAXSAMASMMXXASXMASXMXSAMXSAMXMMMXMSMXMXMMSSSXASXSASMSMMMAMXMXXSAXAXMXMXXSMMMSXM
XXXMXMMXSMSSMMASXXXMAMMAMSAMXAAMAAAMMMXMAXAMAAAAXAAXXMSASMSAMSMMMASAMXSAMXMAMAMXSAMXSXSXMAMASAMXMAAAMXMMXMAXXSASAMASMMXAAAASAMXMXMSSMMMXAMAM
ASXSAMMAMXAAXSASAMXMXXXAXXMMMSSSSMMXSAMMXXAMSSXMSXMSSXMXMAMAXMSAMXAAXMAXMMMMMSSXMASMSAMXMXSASASASMSMSAAMMSMMXMXMAMXAASXMMSMMAMASXAASAAAMMSAM
XAAXASAMMASXMMSSXSMMASMMXSAXAMAXXAXAMAXASXSMMMMMMXMAMXSAMXMMMXSXSSMMSXMXSXMAAXMXSXMAMAMAMXMAMMMASXXASXSMAAAMAMXMXMMMXMAAXMAMXSASMSAMMMMSAMAX
SSSMAMMXMXMXMXMMAAASASAAAAASXMMMSXMMSSMMSAAXAXXMAAMAMAMASAMASMSAXMAMSXSAMASMMSAAAMSXSAMMMAXMXSMMMMMXMMMMMSMMAXXAAXSXSSXMMSMSXMMSMMXXSXMMMSSM
AAAMXMXSXAXXXSAMSMXMMSMMMMMMAAXXMASXAMAXMXMXSXXMXSSSSSSXMASASASXMSSMMAMMMAMMMMMMSMAMSMSMSMSMAMAAAXMAXAXXXAXSXMXSMSXAAXXSAMXSAMASXMAMSAMAXAAX
MSMMXMASMMMSMMAMMXMMAMXSXSMXSMMSMMAMXSMMMMMXXMMSXAAAXAAAXXAAMAMXXAAAMXMAMXSXXAASAMMMXXAMAAAMMMSSSSMMSMMMMMMMAMXMMXMXMMXMASASXMASASAMSAMAMSSM
XAXSMMAXAAXAASMMMAMMASXXAASAMXXAXSAMXSMAAAMMXAASMMMMMXMMMMMMMSMMMSSMMXMXXXAMSSMSASXAMMSSMSMXSAXXMAMXAAASASASAMAXMAXXAMXSAMMSMMXSMXAMXXMXMMXA
XMXMAMMSSMXMMMAASAMXASAMXMASXSSMXSASAMSSXMSAMMMSASXXXAXAXAAAXXMAXAMAAXAAMSAMAXMSMMMMSAAAAXAAMXMXSSMSMSMSASXSXSAXXASMMMMMXSASAMAMMSMMMMMXMSSM
MSSSSMMAAMXSXSXMSMSMMXMMSXMAXMAMASMMAMXMAAAXMAAXAMMSSMSMSSSSSSSMSASXMXMMXAAMXSMXAMXAMMXMMMMMSMMXAAASAXAMMMAMAMMSMMSAXXXAAMASXMASAAAAAAXSMXAM
MAAAAAMSMMAMAXSXMASMMSAXAMXSASAMMSXSXMAMMMMASXMMAMAXXAAAMAAAAXXXSAMMAMXSXMXMXMASXMMMSMMSXSMAMAMAMMMMAAMMAMAMAMASAMSAMXMASMMMMXAMMSXSSXMXMSXM
MSSMXMAMXMASAMSXMAMAAXMMMMAMXSASASXSXMMMMXXASAMSXMMMMSMSMMMMMMMXMXMAXAMMMSAMXMMMMAMASAMMASMMSSMSAMXSSMXSASXMMXXXAMSASXSAMXSAMMSXXXAAAASAXMAS
MAAXXMASMSASAXSMMSSMSSXAXMAXASAMASAMMMSASAMXMAMAAMMAAXMXXMXMAMMAMMXMAMAAAASAMXXMSMMMSAMMAMXAAXAASMMMAAXMAMMXSMMSAMSAMASXSMMXSAMXAMMMSXMAXXXS
MXSMXMXAXMASMMSAMAAAAXMSXMASMMMMMMAMSASXSXMASAMXXXASASMSXMAMAAMASAAXMXSASMXMMSMMAMAAMXMMAMMMMSMMXSMXMMMSASXMSAAXXMMXMXMASAMXMAXMMMMXMMMSMMAS
SSXMXSAMXXMXMASAMSMMMMMMASMAXASAXMSAMXSAMAMXMAXAMSAMAMXAXSASMXXAXXAMMXMAMAMXAAAMXMXSXSSSMSXMAAMASASXAAAMAXXAMMMMSXMXSMMXMAXXXMMMSASAXSAXAXAX
SMMSAXMMMAMAMMSAMXMSSXASAMXMXMSASAMAMMMMMSMMSSMAXMAMAMAXMMXSAAMMMSMSMSMAMAMMSSXMSAMXMMAAAAAMSXMMSAMSSMSMSSMMMAAXXAMAXAXSSMMSXXAAAMSAXMASAMMS
MAAMXXXAMAXAXMMMASMAMSMMXMAMMAMMMXSAMXAASAAXAXMXMMMMSAMSAMAMMMXMAAAAAAMASXMMAMAAAAAXAMXMMMXMMASXMAMAMXXXXAMASXSMSAMSSSMMASAMXMMXMMMXMMAMMAAM
SMMSXSSXSSXMMSAXAXMAMMXMMSMMAMXAAXXASMSMSASMMMAMXAXAXAXSAMXSAAAMSMSMAMXMAXXMASMMSAASMSXSASXMMAMASXMMSMSMSAMXMXAMXAMXMXXSAMMMXAAASXMSAMXSSMXS
XMASMASMAMASASXMAXMXMMAMAAAXSXSSSSSXAAMMSXMAXASMSSSSSSMMAMMAMMMMAAMMSMSAMXSXAXAXXAXXAAXMAMAMMSSMMXAXXAAAMXSXMSXXMAMXAXXMASAMMSMXSAAMSMAXAAAM
AMAXMAMMASMMMSASMSMAASASXMSMXAMAAXAMXMAAXASXMXMAAXAAAMXSXMAMXMAXMSMAAMASMAXMSSSMASMMSMMMAMXMAXAMMSMMMSMSMAMXXMAMSXMMMSMXAMASAAMSMMMMAMXXXMXS
SMASMMSMAMAAMSMMAAMXMAAXMAMAMXMMMMSAMXMSSMSMAMMMMMMMMMMAMXMASXXSAMMSSMXAMMXMAAAMMMSXAMSSMXAMXSAMXAAAXMAXMXSAMMAMASXAAAMMMSAMMSMAXXAXAXMSXMXS
AXMAMSMMMMSMMXMMSSMSSSMXMAMSAMXAXAXSXAMXXAMMMSAMAAAAMAMXSAMXMAXMMMAXAMSMXSAMMSMMAAXXMMMAAMSMMMAMSSSMSMXXMMAAMSASMSMMMMSAASMSAXXMXSMMSXSAASAM
MSMSMAXAXMXASXXAXAAAAAXXMASAAMSXSXMAMAAAMSMAAXASXSMXXASAMASMMSMXSMMMAMAMASASXXXSMSSSMASMMMAAMMAMMAMXXMASMSMSMMASXSASAAMMMSASXMAMMAMAMXMSSMAS
XXAASMSASXMMMXMSXMMMSMMSMMMXMMMXAMXAAXMASAMMMXXMXMASMMMXMSMXAMXXMAXMAMXMASMMXMAMAMAASAMAXXSSMMSSMSAMXMXXAAMAXMAMASAMMSMSSMXMAXAMSAMSMMAMMMMM
SMMMSXMAMAASAXMASXMXMXMASASASAXMMAXMSMSMAMSAMSMSMMXMAMASXAMMSXMASAMXSMXMASASMMAMAMMMMSSXSMAAXAAAMMAMXSSMSMSASMAMXMXMXMAXAAAMMMSXMAMAASMSMAMM
MAMAMXMAMMMMAMXMASXAAMSASMSASXSSXXSAXAAAAXSMMAAMAXXSXMAMAMXAMAXXMASAXXXMXSXMASMSXMXAAXXAMMSXMMSXMMAMAXMAXAMAXMAMAMXMXMMMSSMSMMXASMMSMMAAMASA
SAMXSXSXSXXMXMXMXSSXMXMASAMAMMXMAAMAMXMSSMSAMMSMXMAMXMMSXXMASAMMXMMASASMXMASXMASAMSMMSMSMAMAMXXAMSSMMMMMMXMXMMSSMSSMASAAMAXAASXXMMAAAMSMXXSX
SMSXAXAAMMXAAMASXMAMSMMXMXMXXSAMMMMSMMXAMXSAMSMXAAASXSAAXSMXMAMXSMMMMXAMXSMMMMSMXMAAMXXXMASXSASAMAXMXASAMXXAASAAAAAMAXMMMSMXXMMMAMMSXMXMSAMX
MAMXXMMAMAMXMSAXMXAMAMSASXSMASMXSAAMAXMAMAMAMXASXMASAMMSSXAMSAMXAAAXXMMAAMXMXSAMMMAXXAMXXAMAMXSMMSSMSSSXMAMSMMMSMSSMSSSXAMMSSMSSMMAXASAMXSAS
MAMMMAXXMXSAAMXMXSMXXSXASAAMMMSASMSSXXSAMASAMMMMSMAMMMAMAMAASASXSSMSAAXMASAMXSASMMMSAMSSMAMXMMMMAAAXSAMAMMMXASAMMMXAMAMMMMAXAAAAXMASAMASAMXS
SMSMASMXMAMXSAMXAMASMMMSMXMMSAMXSAXAMXXXMAXASAAAAMSMASXMAXXMSMXMAMXSMSSMMSASMSMMAAAXAXAAMAMXMAAMMXSMMMMASMMSAMASMSMSMAMAAMXSSMSSMMAXXSXMAMAX
AAAMSXMASMMMMXXMMSASAASAAXXAMXMMMMMMASMSMMSAMXMXXXXXMXAMASXMMASAMXASAMXAAMXAMXXXMMMXAMXSXMSXSMMSSXMAMXMAMAAMAMXMAAAASXSSSSXAXXXAMMSSMAMSSMSS
MSMSAXXAXAMXMASXAMASAMXMXMMMSMSASAMXSMASAMMAMMSMSMSMMSAMXMAAMSMXMMMMMMSMMSXSSMSMSAXMXAXMASAMXSSMMASMMAMSSMMMAAMMSMSMSXMMAXMMSXSXMAXAAMXAAAAM
XXXMASMSMSAMXAXMAXXSXMMXAMAXMAAMSASMXMMMAMSAMAAAAAAAASXMXSSMMMAMXXAAMMMMAAXAAMAAMAMSMSASXMASAMMASAMASXXXAMSXSSMXAAAXMASXSXAXAXSAMXSXMXMASMMS
XSXMASAMMMMMMMMXSAMMAMXMMSMSMAMMMAMXAXSSXMMSSSMSMSMSMXAMMMMAAXAMASMMMAMMSSMSXMMSMAMAAXASXSXMAMSAMAMMMMMSMMSAMAXXMXMXSMMAXMXMASMAMAMXSASAMAXX
AASXMMMMAXASXMSAXAXXAMAMMAAAXAMSXSMSMSAXASXMMMMAAXXXMSSMAAMMMMAMXXAASXSAAAAAMMAXMMSMSMAXMXXSXMMASAMSASAAXAMAMMMMSMSASAMMMSAMXAXAMAAASXSASAMM
XMAMAAAMXSMSAAMMMSMSSMSMXMSMSMSXAAAAXSMMASAMXASMSMMXMAMXSSSMSAMXSMSMMAMMXMMMAMAMXXAMXMMMSXASMMSXMAASAMASXMSMMXSXMASAMXMSASASAMSXSMMMSAMAMXAA
MXMSSMSMAMMMMMMAMMAXAAXMSMXAAMMMMMSMXXXAXXAMSAMSAMXAMASMMMAASXMASMAAAXSSMSSXSMSXMMMXAMAAXMAMXXSXMXMMSMAMMXAMXAMAMMMMMXMAXXAMAXMAXMMAMAMAMMSM
MXXXXAXMAMSAMASASMSMMAMAAXSSMXAAAXXXSXSSMXSMMASAMXSXSASAAXMMMMAAMASMSMAAAAAMAAAASASXSMMXMMAMXMSAMSAMXMXMXSASMSMMXSASXMSSSMSMXMMAMXMAMSSXSAXA
MMMMMXMSSMSXSAMXSAXXMXMXMMMAMSSSSSMAXASASAMXMMMMSMMAMAMMMMSAMXSXMAXAXMSMMMMXMAMMSASAXASAXXASAAMXMAASXMMSXSAMAXAMAMAMAAXAXAMAMXXXXXXAMMAAMASA
MASXMMXMXASAMMSMMMMXSAMXSXSAMMAAAMMSMXMAMMXAMAAXAAMXMSMXMXSASAMAMMMAXAXXMXSSMSXXMMMAMAMMMSASXSXMASMMAMXAMMAMAXAMMMMSMMMMMAMAMXMASMSSSMMMMXMM
SASAAXMASMMAMAAAAXSASASASASMSMMMAMAMASMSMSSSSSSSSSMXAASXMASAMXSXMXMXMAMXAAAAAXXMMMMAMXMAXMMMXMASAMXSMXSMMSMMMSAMXAMAMXAMMMSXMXSAXMAMMAXXXMAX
MASMMMAXXXSXMSSSMSAASMMMMAMAAMXXAMASXXMAAAAAXAMXAAXMSASXMAXXAMXXSXSMMMMMMASMMMXSMSMMSXMXSXSAMXXMASXMXAAXAAAAAMXMSXXASXXSAXMMMXMXSMMMSMMSSSSM
MAMMMXSXMASAMAMMMAMMMMXXMXMSMSXSXSASMASMSMAMXMXMMMXXMXXAMSSSMMAXSASAAAASXAXAASASMAXXMXSXXXMAMSMSXMAMMMMMSXXMMMAMXMSMMAMSMXSASASXSAMXAAXSAAAX
SASAMXXMMMSXMAMAXSXSAXSMMXXASAAMAMXXXAMXAXMSMMASAXMXSMMSSMAAAMSSMAMSSSMSAMSSMMASXXSXMASMMMSAMXAAXSXMASMXMSSSSSXSXMAMXMASAASMSASASXMSSSMMMMMM
MASXSMMXAMMMSMSMXMXSXSMAAXSXMMSMAMSSMSSSMMMAAMASASAAAASMAMSSMMMXMAMXMXXXAMXXAMSMMXSAMAMAXAAMXMAMXAXSSXMAAMXAXMXSASXSSXMXMMSXSAMXMMMMMAAASAMA
MMMMAAMSSMXAMXAXASAMXMMAMMSASAMXAXAAXAAXAASMSMAXAXMMXSASXMAAMXMMSASAMMXSXMXSXMXMXAXAMXSSMAXMXAXXMMXMASMMSMMXMMASMMXAXAMASXXAXXXXAAAMSSMMSASM
XSASMSXXAAMSSSSSMMAMMXXXSXSAMMXSMMSMMMSMSMSAAMSMSMSXMXAMXMSAMSXXXXSASXAMXMASXMAXMASMSMAXMAXSXMSAXXAXXAMXMASMMMASXMMSMMXAXAMSMMXMSSXMAMAMSAMM
MSASAMMMMMMAAAMAASXMASMMMAMXMMAXMAMAMAAMAAXXSMXAXAMMXMAMXXMAAXXMSXSAMMAMAMMSASASAMXAAMAMMSXSAASAMSMMAMXXSAMAAMAMASXMASMMSMAXAMSAAAMMXXAMMAMA
AMAMMMAAXAMMMMSSMMMMXSAMMAMAAMMMSASXMSSSMMMSMAMAMAMMAAASXXSMMMMSAMMAMSMMXXAMMSMSMMMSMMXSAXAMMMMMMAASMMSXMASMMMSSXMASAMXXAXXSAMAMXSMMAXSSSMMM
SMSSXMSASMSAAXXAAAXXASAMSXSSSXSAMXSAAMAAXXSAMAMMSSSSXSAMXAXMAASAMMXMXSMSMMMSXMAMXXAXAAAMMMAMAAAXMMXMAAMMSXAXAAXAXMXMAMMSMSMSAMXSXAAMMMMAAXMX
AAAXMXMAMXXMSXSSSSMMXSXMXMMXMAMASXXMMMXAMXSASMSMAAXAAXASMMMSMMSAXAXSSMAAXSASMAMSMMMSAMXAASMSSSSXXSASMMMXSMMSMSSSMXAXAMAAAAMMASMMMSMMSAMSMMMA
MMMSMSMSMSSMXMAAAAMSMMASMXSAMXSAMAXSXSXXMAXMMAAMMSMXMSMMMMMMAAMMMMSMAMMMSMAMAAXAAAAMXMSSXSAAMAXAXSAXMASAXAXAAAXAXMASXMSXSMSAAXAAAAMASAXAMAAX
XAXMMAAAXXAMSXMMMMMAAMAMAXMMXAMMMMAXAMMSMASMMSAMXXXXXMXAAMMSMMMSAXMMXXSXXMXMSSSSSMSSXMXMAMMMMAMMMMXMSMMMSMSMSMSAMXMAXAMAXXXMSSSMSMSAMXSMSMSM
SSSSSMSMSSMMSMXXXSSSSMSSSSSSXSMSAXSMMMAAMXMAAXAMXMXMASMSMXAAAMASMSMXMXAASXSAXAAAAMXAMMAMAMAMMSMMAMAMAAAMAASXMMXMASXXXXMAMASAAMXAMMMMSXSXSAAA
SAXAXAAAMXXASMMMAXAAXAMXAXAAXMASASXMAMXXSASMMMMSAMXSMXAXAMXSSMMSXAMAMMMMMAMXMMMMXSAMXSASAMMAAMMSSXXSXXMSMXMASMMMSMMMMXMXSAMSMSMXMXAMXMSAMMMX
SMSMMSMSMSMMXSAMXXMSMSMMAMMMSMMMXMASASMMMXMASXMAMXAMXMMMXSAAAXXMXMSASAAXMXMAMXSMXAXSAMMSMSSMMSAAXMMMMSXXMXSAMAAMXXAAAASMMMXXXAXMSSMXMAMAMASX
MXMXMAAXXAAXXSXMSSXAAAXXAMXAXAMSSMMSXSAAAMSAMAXASMAMAAAAAMMSMSAMSXSASMMMXAMASXMMSMXMMSAXMAMAAMMMSAXAAXXAXAMXXSMMXSSMSASXAMXMXMAAMAAXXXXSMAMA
SXAASMSMSSSMMXSXAXSMSMSSXMAMXMMAAAXXXXMMMXMXSXMASXMMSXXXSMXXASAASAMXMASMSMMAMAAAXXMXSMMSMSSMMSMASMMMSSXSMXXAXXAMAAMMMMXMASMAAXMSSMMMXSAMMSSM
SMSASXAAXXAAMASMMMSMAMXAMSMSMSMSMMMXMSMSMSMXSXXXMAXAMASMMMSMMMMMMAMSAXAASXMASMMMXMAXMAXXMAXXSAMXXAAXAMXMAMSSMSAMSSXXAMASXMASMSMAMAAAMMAMAXMX
SAMXSXMSXSSSMASAXAMMAMMMAXAAMAAXMSMMAAAAAMXAMASMMSMMSASAAAAAAXXXASMXAMXAMXXAXAAAAMXMSAMSXMSMSASXSSSSXSSMAMAAASAMXMAMAXAMAMMMAAMSSSMSXMMMXMSM
MSMAMXXAXAAAMXSAMXSXSMMXSMSMSMSMAAAAMMSMSMMXSAMAAAAXMASAMXSXMXMMMXAXMMSSMMMMSSMMMSMAXAXSAASXSAXAMAAAAAXSXMMSMSXMAMSSSMASAMAMSMSAAAAMAMSAAAXX
SXMASMSASMSMMMMXMASXAASAMMAAAAXMMMMSMMXXAXSXMASXMSMMMAMMMMXMSASAMMSMAAXAASAMAAXXAAMSMSASMMMAMAMSMMMMMMAAXMXXAMXMAAXAMXMMMMXMAMMMXMAMAMMASMMM
MAMXAAXASXMASASXMASMSMMASXMMMSMSMSAXASMSSMMXSAMAMMMAMASAAXMASASASAAXXMSMMMSMXSAMSSSMSMASXAMAMAMXAMXXXMMMXSAMAMXMMMSASAXAASMSASXSSMASAMXAMAAA
SSMMMMMSMXSAXASAMASAAAMXMASXXXAXAMASAMAAAAXAMASXMASXSSSMMSMMMASAMMSMSAMXSAMXAXMAXXXMAMAMMXSMSMXSAMSMXMSMMMMSMMAXMXMAMAMXMXAXAMXMASASASMMSXMS
AAAAMXMAAMMMMAMXMAMXMXXXSAMMMMSMMMMMAMMMMSMMSAMXSAMXMAMMMSAAMMMAMXAAXAMAMAAMXSXMMXMMXMSSMXSAMXAMAMAAAXAAMXAAASMSXAMSMSSSXXSSSMMSAMMSXMAMXXAX
SMSMSASMSMAMSAMAMAXSXMSAMXSAXAXMAAAMSMSAMAAMMXSXMASMMAMSASXMSXMMMSMSMXMASMMXSMMAMASMXMAAXAXMAMSMMMMSMSSMMMXMXAAMMMXAAXAAXMAAAAAAXXMXMAXMAMSS
XAXASAXXAMAMSASXSMXMAXAXMASXSMSSSSSSMXSASMSMMMSMMAMXXMXMMSAMXXAAASAMXMXMSMXMXAAXSASMAMSSMMSAMMXAXAXAAXAASXASXMXMAMXMSMMSXMASMMMSAASAMXSMAXAX
MAMAMAMSXSAXXAMXMXAXAMMAMXSASXAAXXMAXMSAMAXXSAMXMASMSSMAMMMMAMSMMSAXAAMSXMAAMXMXMASMSXMAAXMAXASXSMSMSMSMMAXXAAXSASAMAAXXAMAMXXXXXXMASASXSMMS
MMMMMMXMASXSMAMASXMSAXXAMXMAMMMMMXMMSMMSMAMSMMXMMASAAMMMMMAMAXXMASXMASXMAXSMMMMAMAMXXASMMMSSMMSAMXAXMAMXSXMMAMMSASMSMSMSXMSMMMSMMXSSMXSAXAXA
MAAAAXAAXMASMSMMAAAMAXSASAMAMXSASXXXMMXAMMMXXSASXSMMMSMSASMSMSMMMXMASXASMXMSAAMXMXSMXAMXSXAXAAMXMMMSMAMAMAMXAMXMAMXSAMXSAAXXAAAAMAMAMSMMMSMM
SSSSMSSSXMAMAXAXMMMMXMMASXSASXSASASMXMSXMSAAAXASMAXMASAMASAAXMAMAMXXXSXMMAAASMMAMXMASXMAMMMXMMMAMAAAMASASAMXMMSMAMXMAMASMMMSMSSSMASAMAAAAXAX
XAAAAAAMXMAXAMMXASAXSMSMSMSAXXMMMMMMAMXSAAMMSMXMXSMMAMXMAMXMMMSAMXMMMMMSXXSMAMSSMMXAAAMXMAAMMXSASMSSSMSASASXSAXXMMXMXMAMAAAXXXAMMMMXSMSMMSMM
XMSMMMSMAXSMSSXSASXSAAAMMAMAMSMSAAASMMAMSMXAMMMSMMMSSMMMXSAMAAAAXASAMXAMSMAXMMAMXXMSSMMSSMXSAASAMAAAXAMAMMAAMMSSMSMSAMXSSMSSMSAMSSMASAXAAAMA
SAMXSXXMXXXAAXASAMXMMSMSMMMAMAASXSXXMMAMAXMASAAAAMAAAAMMASASMSSMSASASMMSAXMMMMAXSAMXAAAMXMAMMMMAMMMSMSMSMAMXAMAAXASAMXMMAAMXAMSMAAMAMMSMSSSS
AMSXMASXSAMXMMAMXMASXMXAXXSXSMMMMMMMXSMSASASXMSSSMMXSAMMASMMMXXMAMSXMAXSAMXMSSXMASASXMMSAMXSXSSXMASAMXSMAXXSXMASMSMSAMXSMMMMSMXMSSMXSXXMMMXX
```

## File: README.md
```markdown
# Those are the solution for Advent Of Code 2024
```

## File: test.py
```python
import math

hello = [1,2,3,4,5]

print(math.ceil(len(hello)/2))

print(round(2.5))
```
