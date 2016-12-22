var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');

import {SortingAlgorithem, BubbleSort, SelectionSort, InsertionSort, MergeSort, QuickSort} from "./algorithms";

// type of object
var SortType = new graphql.GraphQLObjectType({
    name: 'sort',
    fields: function () {
        return {
            initialArray: {
                type: new graphql.GraphQLList(graphql.GraphQLInt),
                resolve: function (array:number[]) {
                    return array;
                }
            },
            sortedArray: {
                type: new graphql.GraphQLList(graphql.GraphQLInt),
                resolve: function (array:number[]) {
                    return array.concat().sort()
                }
            },
            algorithms: {
                type: AlgorithmsType,
                resolve: function (array:number[]) {
                    return array.slice();
                }
            }
        }
    }
});

// type of object
var AlgorithmsType = new graphql.GraphQLObjectType({
    name: 'algorithms',
    fields: function () {
        return {
            bubblesort: {
                type: AlgorithemType,
                resolve: function (array:number[]) {
                    return new BubbleSort(array.slice());
                }
            },
            selectionsort: {
                type: AlgorithemType,
                resolve: function (array:number[]) {
                    return new SelectionSort(array.slice());
                }
            },
            insertionsort: {
                type: AlgorithemType,
                resolve: function (array:number[]) {
                    return new InsertionSort(array.slice());
                }
            },
            mergesort: {
                type: AlgorithemType,
                resolve: function (array:number[]) {
                    return new MergeSort(array.slice());
                }
            },
            quicksort: {
                type: AlgorithemType,
                resolve: function (array:number[]) {
                    return new QuickSort(array.slice());
                }
            },
        }
    }
});

// type of object
var AlgorithemType = new graphql.GraphQLObjectType({
    name: 'algorithm',
    fields: function () {
        return {
            name: {
                type: graphql.GraphQLString,
                resolve: function (data:SortingAlgorithem) {
                    return data.name;
                }
            },
            description: {
                type: graphql.GraphQLString,
                resolve: function (data:SortingAlgorithem) {
                    return data.description;
                }
            },
            complexity: {
                type: graphql.GraphQLString,
                resolve: function (data:SortingAlgorithem) {
                    return data.complexity;
                }
            },
            myNotes: {
                type: graphql.GraphQLString,
                resolve: function (data:SortingAlgorithem) {
                    return data.myNotes;
                }
            },
            initialArray: {
                type: new graphql.GraphQLList(graphql.GraphQLInt),
                resolve: function (data:SortingAlgorithem) {
                    return data.initialArray;
                }
            },
            sortedArray: {
                type: new graphql.GraphQLList(graphql.GraphQLInt),
                resolve: function (data:SortingAlgorithem) {
                    return data.sortedArray;
                }
            },
            history: {
                type: new graphql.GraphQLList(new graphql.GraphQLList(graphql.GraphQLInt)),
                resolve: function (data:SortingAlgorithem) {
                    return data.history;
                }
            }
        }
    }
});

// query specification
var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            sort: {
                type: SortType,
                args: {
                    array: {
                        name: 'array',
                        type: new graphql.GraphQLNonNull(new graphql.GraphQLList(graphql.GraphQLInt))
                    }
                },
                resolve: function (data:any, {array}) {
                    return array;
                }

            }
        }
    }
});

// build schema
var Schema = new graphql.GraphQLSchema({
    query: queryType
});

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: Schema,
    rootValue: root,
    graphiql: true,
}));
var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Running a GraphQL API server at localhost:${port}}/graphql`);
});