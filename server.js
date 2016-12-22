"use strict";
var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');
var algorithms_1 = require("./algorithms");
var SortType = new graphql.GraphQLObjectType({
    name: 'sort',
    fields: function () {
        return {
            initialArray: {
                type: new graphql.GraphQLList(graphql.GraphQLInt),
                resolve: function (array) {
                    return array;
                }
            },
            sortedArray: {
                type: new graphql.GraphQLList(graphql.GraphQLInt),
                resolve: function (array) {
                    return array.concat().sort();
                }
            },
            algorithms: {
                type: AlgorithmsType,
                resolve: function (array) {
                    return array.slice();
                }
            }
        };
    }
});
var AlgorithmsType = new graphql.GraphQLObjectType({
    name: 'algorithms',
    fields: function () {
        return {
            bubblesort: {
                type: AlgorithemType,
                resolve: function (array) {
                    return new algorithms_1.BubbleSort(array.slice());
                }
            },
            selectionsort: {
                type: AlgorithemType,
                resolve: function (array) {
                    return new algorithms_1.SelectionSort(array.slice());
                }
            },
            insertionsort: {
                type: AlgorithemType,
                resolve: function (array) {
                    return new algorithms_1.InsertionSort(array.slice());
                }
            },
            mergesort: {
                type: AlgorithemType,
                resolve: function (array) {
                    return new algorithms_1.MergeSort(array.slice());
                }
            },
            quicksort: {
                type: AlgorithemType,
                resolve: function (array) {
                    return new algorithms_1.QuickSort(array.slice());
                }
            },
        };
    }
});
var AlgorithemType = new graphql.GraphQLObjectType({
    name: 'algorithm',
    fields: function () {
        return {
            name: {
                type: graphql.GraphQLString,
                resolve: function (data) {
                    return data.name;
                }
            },
            description: {
                type: graphql.GraphQLString,
                resolve: function (data) {
                    return data.description;
                }
            },
            complexity: {
                type: graphql.GraphQLString,
                resolve: function (data) {
                    return data.complexity;
                }
            },
            myNotes: {
                type: graphql.GraphQLString,
                resolve: function (data) {
                    return data.myNotes;
                }
            },
            initialArray: {
                type: new graphql.GraphQLList(graphql.GraphQLInt),
                resolve: function (data) {
                    return data.initialArray;
                }
            },
            sortedArray: {
                type: new graphql.GraphQLList(graphql.GraphQLInt),
                resolve: function (data) {
                    return data.sortedArray;
                }
            },
            history: {
                type: new graphql.GraphQLList(new graphql.GraphQLList(graphql.GraphQLInt)),
                resolve: function (data) {
                    return data.history;
                }
            }
        };
    }
});
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
                resolve: function (data, _a) {
                    var array = _a.array;
                    return array;
                }
            }
        };
    }
});
var Schema = new graphql.GraphQLSchema({
    query: queryType
});
var app = express();
app.use('/graphql', graphqlHTTP({
    schema: Schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(443, function () {
    console.log('Running a GraphQL API server at localhost:443/graphql');
});
