

var chai = require('chai');
import { BubbleSort, SelectionSort, InsertionSort, MergeSort, QuickSort } from "./algorithms";
var expect = chai.expect;


describe("Sorting Algorithm", function () {
    var initialArrays = [[5, 0, 7, 3, 9, 4, 2, 8, 6, 1], [7, 9, 2, 1, 3, 5, 8, 6, 4, 0], [3, 1, 5, 8, 4, 0, 7, 2, 6, 9], [9,8,7,6,5,4,3,2,1,0]];
    var sortedArrays = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]];
    describe("Bubble Sort", function () {
        var sortedBSObjects:any[]  = [];
        initialArrays.forEach((array) => {
            var bs = new BubbleSort(array.slice());
            sortedBSObjects.push(bs);
        });
        it("Should return an object with a sortedArray property of type array", function () {
            sortedBSObjects.forEach((bs) => {
                expect(bs).have.property('sortedArray')
                expect(bs.sortedArray).to.be.an('array')
            });
        });
        it("Sorted array Property should be sorted", function () {
            sortedBSObjects.forEach((bs, index) => {
                expect(bs.sortedArray).to.eql(sortedArrays[index]);
            });
        });
    });
    describe("Selection Sort", function () {
        var sortedSSObjects:any[] = [];
        initialArrays.forEach((array) => {
            var ss = new SelectionSort(array.slice());
            sortedSSObjects.push(ss);
        });
        it("Should return an object with a sortedArray property of type array", function () {
            sortedSSObjects.forEach((ss) => {
                expect(ss).have.property('sortedArray')
                expect(ss.sortedArray).to.be.an('array')
            });
        });
        it("Sorted array Property should be sorted", function () {
            sortedSSObjects.forEach((ss, index) => {
                expect(ss.sortedArray).to.eql(sortedArrays[index]);
            });
        });
    });
    describe("Insertion Sort", function () {
        var sortedISObjects:any[]  = [];
        initialArrays.forEach((array) => {
            var is = new BubbleSort(array.slice());
            sortedISObjects.push(is);
        });
        it("Should return an object with a sortedArray property of type array", function () {
            sortedISObjects.forEach((is) => {
                expect(is).have.property('sortedArray')
                expect(is.sortedArray).to.be.an('array')
            });
        });
        it("Sorted array Property should be sorted", function () {
            sortedISObjects.forEach((is, index) => {
                expect(is.sortedArray).to.eql(sortedArrays[index]);
            });
        });
    });
    describe("Merge Sort", function () {
        var sortedMSObjects:any[]  = [];
        initialArrays.forEach((array) => {
            var ms = new BubbleSort(array.slice());
            sortedMSObjects.push(ms);
        });
        it("Should return an object with a sortedArray property of type array", function () {
            sortedMSObjects.forEach((ms) => {
                expect(ms).have.property('sortedArray')
                expect(ms.sortedArray).to.be.an('array')
            });
        });
        it("Sorted array Property should be sorted", function () {
            sortedMSObjects.forEach((ms, index) => {
                expect(ms.sortedArray).to.eql(sortedArrays[index]);
            });
        });
    });
    describe("Quick Sort", function () {
        var sortedQSObjects:any[] = [];
                console.log(initialArrays)
        initialArrays.forEach((array) => {
            var qs = new QuickSort(array.slice());
            sortedQSObjects.push(qs);
        });
        it("Should return an object with a sortedArray property of type array", function () {
            sortedQSObjects.forEach((qs) => {
                expect(qs).have.property('sortedArray')
                expect(qs.sortedArray).to.be.an('array')
            });
        });
        it("Sorted array Property should be sorted", function () {
            sortedQSObjects.forEach((qs, index) => {
                expect(qs.sortedArray).to.eql(sortedArrays[index]);
            });
        });
    });

});