# Updates to UTXODiffs

This document outlines a problematic scenario in the management of UTXODiffs 
and suggests a solution to it.

## Problem Definition
Currently, when a block B's status is resolved, and UTXOSet is calculated,
the UTXOSet is represented as a Diff against some UTXODiffChild.
The UTXODiff child is one of:
1. If B is going to be the next SelectedTip - B.UTXODiffChild = virtual
2. Otherwise - B.UTXODiffChild = currentSelectedTip

This scheme was invented to solve the problem of having multiple 
virtualDiffParents whose UTXODiffs need to be constantly updated.

### Deep re-organizations
Suppose we have the following DAG structure:
```
  --- A1 --- A2 --- ... --- An
 /
S
 \
  --- B1 --- B2 --- ... --- Bn -- Bn+1
```
We have two chains, where A<sub>1</sub>...A<sub>n</sub> is the older chain, and An was previously
the SelectedTip.  
S is the split block.  
B<sub>1</sub>...B<sub>n+1</sub> is a competing chain that is currently re-organizing the DAG.
n can be as large as finalityWindowSize ≈ 86,000  

Once B<sub>n+1</sub> is inserted to the DAG, a re-org process will begin, 
where all B<sub>1</sub>...B<sub>n</sub> are resolved, with a UTXODiff to SelectedTip a.k.a. A<sub>n</sub>.  
The size of such a UTXODiff would be O(n) UTXOEntries.  
Times n+1 blocks we get O(n<sup>2</sup>)  UTXOEntries to be saved to the hard disk.  
With n=86000 that's nearly 7.4 billion entries - something that will explode 
any hard disk.

# Proposed Solution

## First Variant
Instead of pointing to selectedTip, blocks that are not the selectedTip will
point to their selectedParent.  
E.g. B<sub>1</sub>.UTXODiffChild = S, B<sub>i</sub>.UTXODiffChild = B<sub>i-1</sub>

This will ensure small diffs between each block and block.  

### Downside
However, since we allow UTXODiffChildren to point to the past, 
a major downside exists in this scheme:  
The path to restore the UTXOSet of some B<sub>i</sub> is n+i-1 blocks.  

#### Solution 1: In the short term
Once done resolving B<sub>i</sub> - store it's UTXODiff against virtual
in-memory.  
Then while we are resolving B<sub>i+1</sub>, 
since B<sub>i+1</sub>.selectedParent = B<sub>i</sub>, we don't need
to restore it's UTXOSet (it's saved in-memory in the previous step)

#### Solution 2: In the long term
Once B<sub>n+1</sub> is resolved, for any 1 ≤ i < n+1:  
B<sub>i+1</sub>'s UTXOSet is stored as a diff from it's 
selectedParent(a.k.a. B<sub>i</sub>'s).  

Therefore, we can reverse the order.
In other words:
```
For i := range [1..n]:
  Bi.UTXODiff = Bi+1.UTXODiff.Reverse()
  Bi.UTXODiffParent = Bi+1
```
Once this is done, all blocks are going to have their 
UTXODiffChildren in their anti-past.

This should, and can, be done in a way that will be resilient to crashes
mid-operation.

### Remaining Problems
Two unsolved problems still remain:
1. As previously, in the end of the process, we'll assign
   A<sub>n</sub>.UTXODiffChild = B<sub>n+1</sub>, with a huge diff.  
   This is not catastrophic, since very deep re-orgs are rare, a single
   such block will not overfill any hard-disk, and the diff will eventually
   get pruned.
    
2. Up until the point where B<sub>n+1</sub> is assigned SelectedTip and virtual 
   is updated, all blocks UTXO sets are represented as a diff vs the old 
   virtual. 
   In case of B<sub>i</sub> that would be O(n) UTXO entries, and thus
   all operations on those would be O(n) CPU-complexity. Times n blocks,
   and we are looking at O(n<sup>2</sup>) CPU-complexity.
   
   Unfortunately, seems like there is no way to mitigate this without updating 
   virtual as-we-go, which would present its own set of problems.  
   However, it seems like this will still be performant enough,
   keeping in mind that deep re-orgs are very rare, and are expected
   to be slow anyway. 