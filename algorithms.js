"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SortingAlgorithem = (function () {
    function SortingAlgorithem(array) {
        this.history = [];
        this.sortedArray = this.sort(array);
    }
    SortingAlgorithem.prototype.sort = function (array) {
        return this.initialArray.concat().sort();
    };
    SortingAlgorithem.prototype.addToHistory = function (array) {
        this.history.push(array.slice());
    };
    SortingAlgorithem.prototype.swap = function (array, index1, index2) {
        if (index1 > array.length - 1 || index2 > array.length - 1 || index1 === index2)
            return;
        var originalIndex1Value = array[index1];
        array[index1] = array[index2];
        array[index2] = originalIndex1Value;
    };
    SortingAlgorithem.prototype.insertAndShift = function (array, startingIndex, endingIndex) {
        if (startingIndex > array.length - 1 || endingIndex > array.length - 1 || startingIndex === endingIndex)
            return;
        if (startingIndex > endingIndex) {
            for (var i = endingIndex; i < startingIndex; i++) {
                this.swap(array, i, startingIndex);
            }
        }
    };
    return SortingAlgorithem;
}());
exports.SortingAlgorithem = SortingAlgorithem;
var BubbleSort = (function (_super) {
    __extends(BubbleSort, _super);
    function BubbleSort() {
        _super.apply(this, arguments);
        this.name = "BubbleSort";
        this.description = "Starting on the left, compare adjacent items and keep “bubbling” the larger one to the right (it’s in its final place). Bubble sort the remaining N -1 items.";
        this.complexity = "Best: O(n), Worst:O(N^2)";
        this.myNotes = "I used recursion to implement Bubble Sort to gain more practice with recursion algorithems. In order to achieve the Best Case of O(n) we must check if a value was swapped. If not value was swapped, we know the list is sorted and can return. ";
    }
    BubbleSort.prototype.sort = function (array) {
        this.history.push(array);
        return this.bubbleSort(array.slice(), array.length);
    };
    BubbleSort.prototype.bubbleSort = function (array, unsortedCount) {
        if (unsortedCount < 2)
            return array;
        var swapped = false;
        for (var i = 1; i < unsortedCount; i++) {
            var currentValue = array[i];
            var previousValue = array[i - 1];
            if (previousValue > currentValue) {
                this.swap(array, i, i - 1);
                swapped = true;
                this.addToHistory(array);
            }
        }
        if (!swapped)
            return array;
        return this.bubbleSort(array, unsortedCount - 1);
    };
    return BubbleSort;
}(SortingAlgorithem));
exports.BubbleSort = BubbleSort;
var SelectionSort = (function (_super) {
    __extends(SelectionSort, _super);
    function SelectionSort() {
        _super.apply(this, arguments);
        this.name = "SelectionSort";
        this.description = "Scan all items and find the smallest. Swap it into position as the first item. Repeat the selection sort on the remaining N-1 items.";
        this.complexity = "Best/Worst: O(N^2)";
        this.myNotes = "Seemes to be the most intuative to think and write. Again, implmented with a recursive algorithem for more practice";
    }
    SelectionSort.prototype.sort = function (array) {
        this.addToHistory(array);
        return this.selectionSort(array, 0);
    };
    SelectionSort.prototype.selectionSort = function (array, startingIndex) {
        if (array.length - startingIndex < 2)
            return array;
        var minValueIndex = startingIndex;
        for (var i = startingIndex + 1; i < array.length; i++) {
            var currentValue = array[i];
            var minValue = array[minValueIndex];
            if (currentValue < minValue) {
                minValueIndex = i;
            }
        }
        if (minValueIndex != startingIndex) {
            this.swap(array, minValueIndex, startingIndex);
            this.addToHistory(array);
        }
        return this.selectionSort(array, startingIndex + 1);
    };
    return SelectionSort;
}(SortingAlgorithem));
exports.SelectionSort = SelectionSort;
var InsertionSort = (function (_super) {
    __extends(InsertionSort, _super);
    function InsertionSort() {
        _super.apply(this, arguments);
        this.name = "InsertionSort";
        this.description = "Start with a sorted list of 1 element on the left, and N-1 unsorted items on the right. Take the first unsorted item (element #2) and insert it into the sorted list, moving elements as necessary. We now have a sorted list of size 2, and N -2 unsorted elements. Repeat for all elements.";
        this.complexity = "Best: O(N), Worst:O(N^2)";
        this.myNotes = "Did some research on the insertion side of it. Was interested if a binary search would boost performace. Seems that using the binary search would help worst case scenerio but hurt best case scenerio. Also, because I am trying to find my insertion index by starting at the beginning of the sorted array my implementation is prioritized for mostly reverse sorted arrays";
    }
    InsertionSort.prototype.sort = function (array) {
        this.addToHistory(array);
        return this.insertionSort(array, 1);
    };
    InsertionSort.prototype.insertionSort = function (array, unsortedStart) {
        if (array.length - unsortedStart < 1)
            return array;
        var unsortedValue = array[unsortedStart];
        for (var i = 0; i < unsortedStart; i++) {
            var currentValue = array[i];
            if (unsortedValue < currentValue) {
                this.insertAndShift(array, unsortedStart, i);
                this.addToHistory(array);
                break;
            }
        }
        return this.insertionSort(array, unsortedStart + 1);
    };
    return InsertionSort;
}(SortingAlgorithem));
exports.InsertionSort = InsertionSort;
var MergeSort = (function (_super) {
    __extends(MergeSort, _super);
    function MergeSort() {
        _super.apply(this, arguments);
        this.name = "MergeSort";
        this.description = "Merge";
        this.complexity = "Best: O(N lg(N)), Worst:O( N lg(N) )";
        this.myNotes = "Initially seemed counter intuative to implement but can be broken down into pretty basic steps. Split the array in half, recursivly call merge sort on those two halves, then merge the sorted halves. Seems all the complexity comes from the merge portion of this. ";
    }
    MergeSort.prototype.sort = function (array) {
        this.addToHistory(array);
        return this.mergeSort(array, 0, array.length);
    };
    MergeSort.prototype.mergeSort = function (array, startingIndex, endingIndex) {
        if (endingIndex < startingIndex || endingIndex > array.length || startingIndex < 0 || endingIndex - startingIndex < 2)
            return array;
        var midpoint = Math.ceil((endingIndex - startingIndex) / 2) + startingIndex;
        this.mergeSort(array, startingIndex, midpoint);
        this.mergeSort(array, midpoint, endingIndex);
        var sortedArray = this.merge(array, startingIndex, midpoint, endingIndex);
        return sortedArray;
    };
    MergeSort.prototype.merge = function (array, startingIndex1, midPoint, endingIndex) {
        var array1 = array.slice(startingIndex1, midPoint);
        var array2 = array.slice(midPoint, endingIndex);
        var i = 0;
        var j = 0;
        var updated = false;
        while (i < array1.length && j < array2.length) {
            var currentValue1 = array1[i];
            var currentValue2 = array2[j];
            if (currentValue1 < currentValue2) {
                if (array[startingIndex1 + i + j] != currentValue1) {
                    array[startingIndex1 + i + j] = currentValue1;
                    updated = true;
                }
                i++;
            }
            else {
                if (array[startingIndex1 + i + j] != currentValue2) {
                    array[startingIndex1 + i + j] = currentValue2;
                    updated = true;
                }
                j++;
            }
        }
        while (i < array1.length) {
            if (array[startingIndex1 + i + j] != array1[i]) {
                array[startingIndex1 + i + j] = array1[i];
                updated = true;
            }
            i++;
        }
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
    };
    return MergeSort;
}(SortingAlgorithem));
exports.MergeSort = MergeSort;
var QuickSort = (function (_super) {
    __extends(QuickSort, _super);
    function QuickSort() {
        _super.apply(this, arguments);
        this.name = "QuickSort";
        this.description = "Quicksort is a divide and conquer algorithm. Quicksort first divides a large array into two smaller sub-arrays: the low elements and the high elements. Quicksort can then recursively sort the sub-arrays.";
        this.complexity = "Best: O(N lg(N)), Worst:O( N^2 )";
        this.myNotes = "Actually seems like a pretty straightforward algorithem";
    }
    QuickSort.prototype.sort = function (array) {
        this.addToHistory(array);
        return this.quickSort(array, 0, array.length - 1);
    };
    QuickSort.prototype.quickSort = function (array, startingIndex, endingIndex) {
        if (endingIndex < startingIndex || endingIndex > array.length || startingIndex < 0 || endingIndex - startingIndex < 1)
            return array;
        var finalPivotIndex = this.partition(array, startingIndex, endingIndex);
        this.quickSort(array, startingIndex, finalPivotIndex - 1);
        return this.quickSort(array, finalPivotIndex + 1, endingIndex);
    };
    QuickSort.prototype.partition = function (array, startingIndex, endingIndex) {
        var finalPivotIndex = startingIndex;
        var pivotValue = array[startingIndex];
        for (var i = startingIndex + 1; i < endingIndex + 1; i++) {
            if (array[i] < pivotValue) {
                this.insertAndShift(array, i, finalPivotIndex);
                this.addToHistory(array);
                finalPivotIndex++;
            }
        }
        return finalPivotIndex;
    };
    return QuickSort;
}(SortingAlgorithem));
exports.QuickSort = QuickSort;
