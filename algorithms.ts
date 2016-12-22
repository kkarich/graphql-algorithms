export class SortingAlgorithem {
    // define all the properties of an algorithem
    name: string;
    description: String;
    complexity: String;
    myNotes: String;
    initialArray: number[];
    sortedArray: number[];
    history: number[][];

    // general constructor for an algorithem
    constructor(array: number[]) {
        this.history = [];
        this.sortedArray = this.sort(array);

    }
    // 
    sort(array: number[]): number[] {
        return this.initialArray.concat().sort();
    }
    // 
    addToHistory(array: number[]): void {
        this.history.push(array.slice());
    }

    swap(array: number[], index1: number, index2: number) {

        // ensure the index exist
        if (index1 > array.length - 1 || index2 > array.length - 1 || index1 === index2) return;

        // keep a copy of the value at index1;
        var originalIndex1Value = array[index1];

        // replace the value at index 1 with the value at index 2
        array[index1] = array[index2];

        // replace the value at index 2 with the copy of index1
        array[index2] = originalIndex1Value;

    }

    insertAndShift(array: number[], startingIndex: number, endingIndex: number) {
        // ensure the index exist
        if (startingIndex > array.length - 1 || endingIndex > array.length - 1 || startingIndex === endingIndex) return;

        if (startingIndex > endingIndex) {
            for (var i = endingIndex; i < startingIndex; i++) {
                this.swap(array, i, startingIndex);
            }
        }

    }

}

// Bubble Sort implementation
export class BubbleSort extends SortingAlgorithem {
    name: string = "BubbleSort";
    description: string = "Starting on the left, compare adjacent items and keep “bubbling” the larger one to the right (it’s in its final place). Bubble sort the remaining N -1 items.";
    complexity: string = "Best: O(n), Worst:O(N^2)";
    myNotes: string = "I used recursion to implement Bubble Sort to gain more practice with recursion algorithems. In order to achieve the Best Case of O(n) we must check if a value was swapped. If not value was swapped, we know the list is sorted and can return. ";

    // define sorting algorythem
    sort(array: number[]): number[] {
        this.history.push(array);
        return this.bubbleSort(array.slice(), array.length);
    }

    // implement specific sorting implementation
    bubbleSort(array: number[], unsortedCount: number): number[] {
        // check for default cases: Array with no value or array with 1 value
        if (unsortedCount < 2) return array;

        // check if swapped happened. Needed for Best case O(n) without everything would be O(n^2)
        var swapped = false;
        // start loop from seconf index
        for (var i = 1; i < unsortedCount; i++) {
            // get position
            const currentValue = array[i];
            const previousValue = array[i - 1];
            if (previousValue > currentValue) {
                this.swap(array, i, i - 1);
                swapped = true;
                this.addToHistory(array);
            }

        }

        // if no swap occured we know the array is now sorted and can return the array
        if (!swapped) return array;
        return this.bubbleSort(array, unsortedCount - 1);
    }
}

// Selection Sort implementation
export class SelectionSort extends SortingAlgorithem {
    name: string = "SelectionSort";
    description: string = "Scan all items and find the smallest. Swap it into position as the first item. Repeat the selection sort on the remaining N-1 items.";
    complexity: string = "Best/Worst: O(N^2)";
    myNotes: string = "Seemes to be the most intuative to think and write. Again, implmented with a recursive algorithem for more practice";

    // define sorting algorythem
    sort(array: number[]): number[] {
        // push the initial array into the history section
        this.addToHistory(array);
        return this.selectionSort(array, 0);
    }

    // implement specific sorting implementation
    selectionSort(array: number[], startingIndex: number): number[] {
        // check for default cases: Array with passed in starting index that has 1,0 or NA indexes left to sort
        if (array.length - startingIndex < 2) return array;

        // init the min
        var minValueIndex = startingIndex;

        // start loop from the next index
        for (var i = startingIndex + 1; i < array.length; i++) {
            // get position
            const currentValue = array[i];
            const minValue = array[minValueIndex];
            if (currentValue < minValue) {
                minValueIndex = i;
            }

        }

        if (minValueIndex != startingIndex) {
            this.swap(array, minValueIndex, startingIndex);
            this.addToHistory(array);
        }
        return this.selectionSort(array, startingIndex + 1);
    }
}

// Selection Sort implementation
export class InsertionSort extends SortingAlgorithem {
    name: string = "InsertionSort";
    description: string = "Start with a sorted list of 1 element on the left, and N-1 unsorted items on the right. Take the first unsorted item (element #2) and insert it into the sorted list, moving elements as necessary. We now have a sorted list of size 2, and N -2 unsorted elements. Repeat for all elements.";
    complexity: string = "Best: O(N), Worst:O(N^2)";
    myNotes: string = "Did some research on the insertion side of it. Was interested if a binary search would boost performace. Seems that using the binary search would help worst case scenerio but hurt best case scenerio. Also, because I am trying to find my insertion index by starting at the beginning of the sorted array my implementation is prioritized for mostly reverse sorted arrays";

    // define sorting algorythem
    sort(array: number[]): number[] {
        // push the initial array into the history section
        this.addToHistory(array);

        // we know the first index is sorted. So start at index 1
        return this.insertionSort(array, 1);
    }

    // implement specific sorting implementation
    insertionSort(array: number[], unsortedStart: number): number[] {
        // check for default cases: Array with passed in starting index that has 1,0 or NA indexes left to sort
        if (array.length - unsortedStart < 1) return array;

        // get the value of our first unsorted index
        const unsortedValue = array[unsortedStart];
        // search through the sorted array starting from the min value
        for (var i = 0; i < unsortedStart; i++) {
            const currentValue = array[i];

            // if our value is less than the current value. We know we need to insert here
            if (unsortedValue < currentValue) {
                this.insertAndShift(array, unsortedStart, i);
                this.addToHistory(array);
                break;
            }

        }

        return this.insertionSort(array, unsortedStart + 1);
    }
}


export class MergeSort extends SortingAlgorithem {
    name: string = "MergeSort";
    description: string = "Merge";
    complexity: string = "Best: O(N lg(N)), Worst:O( N lg(N) )";
    myNotes: string = "Initially seemed counter intuative to implement but can be broken down into pretty basic steps. Split the array in half, recursivly call merge sort on those two halves, then merge the sorted halves. Seems all the complexity comes from the merge portion of this. ";

    // define sorting algorythem
    sort(array: number[]): number[] {
        // push the initial array into the history section
        this.addToHistory(array);

        // we know the first index is sorted. So start at index 1
        return this.mergeSort(array, 0, array.length);
    }

    mergeSort(array: number[], startingIndex: number, endingIndex: number): number[] {
        // check for default cases: The sub array is sorted if it has 0 or 1 elements
        if (endingIndex < startingIndex || endingIndex > array.length || startingIndex < 0 || endingIndex - startingIndex < 2) return array;

        // define midoint and array values
        const midpoint = Math.ceil((endingIndex - startingIndex) / 2) + startingIndex;
        // sort sub arrays
        this.mergeSort(array, startingIndex, midpoint);
        this.mergeSort(array, midpoint, endingIndex);

        // merge the sorted array and return it
        const sortedArray = this.merge(array, startingIndex, midpoint, endingIndex);
        return sortedArray;
    }

    // helper function for merging sorted arrays
    merge(array: number[], startingIndex1: number, midPoint: number, endingIndex: number) {
        // get temp arrays
        const array1 = array.slice(startingIndex1, midPoint);
        const array2 = array.slice(midPoint, endingIndex);

        // set indexes
        var i = 0;
        var j = 0;

        var updated = false;
        // check both arrays
        while (i < array1.length && j < array2.length) {
            // get the current values for first array
            const currentValue1 = array1[i];
            // get second array value
            const currentValue2 = array2[j];

            // check what value is smaller
            // For whatever array is smaller push taht value into the merged array and incriment that arrays index
            if (currentValue1 < currentValue2) {
                if (array[startingIndex1 + i + j] != currentValue1) {
                    array[startingIndex1 + i + j] = currentValue1;
                    updated = true;
                }
                i++;
            } else {
                if (array[startingIndex1 + i + j] != currentValue2) {
                    array[startingIndex1 + i + j] = currentValue2;
                    updated = true;
                }
                j++;
            }
        }

        // if there are any values left in our first array we can just push them in
        while (i < array1.length) {
            if (array[startingIndex1 + i + j] != array1[i]) {
                array[startingIndex1 + i + j] = array1[i];
                updated = true;
            }
            i++;
        }
        // if there are any values left for the second array. we just need to push them in
        while (j < array2.length) {
            if (array[startingIndex1 + i + j] != array2[j]) {
                array[startingIndex1 + i + j] = array2[j];
                updated = true;
            }
            j++;
        }
        if (updated) {
            this.addToHistory(array);

        }
        return array;
    }
}


export class QuickSort extends SortingAlgorithem {
    name: string = "QuickSort";
    description: string = "Quicksort is a divide and conquer algorithm. Quicksort first divides a large array into two smaller sub-arrays: the low elements and the high elements. Quicksort can then recursively sort the sub-arrays.";
    complexity: string = "Best: O(N lg(N)), Worst:O( N^2 )";
    myNotes: string = "Actually seems like a pretty straightforward algorithem";

    // define sorting algorythem
    sort(array: number[]): number[] {
        // push the initial array into the history section
        this.addToHistory(array);

        // we know the first index is sorted. So start at index 1
        return this.quickSort(array, 0, array.length - 1);
    }

    quickSort(array: number[], startingIndex: number, endingIndex: number): number[] {
        // check for default cases: The sub array is sorted if it has 0 or 1 elements
        if (endingIndex < startingIndex || endingIndex > array.length || startingIndex < 0 || endingIndex - startingIndex < 1) return array;
        var finalPivotIndex = this.partition(array, startingIndex, endingIndex);

        // sort left of the pivot, do not include pivot
        this.quickSort(array, startingIndex, finalPivotIndex - 1);
        // sort right of the pivot, do not include pivot
        return this.quickSort(array, finalPivotIndex + 1, endingIndex);

    }

    partition(array: number[], startingIndex: number, endingIndex: number): number {
        // init pivot value and final pivot index to startingIndex
        var finalPivotIndex: number = startingIndex;
        var pivotValue = array[startingIndex];

        // loop through all values in array and leaving them in place if they are greater than the pivot value
        // if they are less than the pivot value, insert and shift before the pivot value and increment the final pivot index
        for (var i = startingIndex + 1; i < endingIndex + 1; i++) {
            if (array[i] < pivotValue) {
                this.insertAndShift(array, i, finalPivotIndex);

                this.addToHistory(array);
                finalPivotIndex++;
            }
        }

        return finalPivotIndex;
    }
}