# OpenActive Data Model Validator

This repository contains schemas and code to support validation of data published according to the [Modelling Opportunity Data](https://www.openactive.io/modelling-opportunity-data) specification.

The schemas are provided to allow users to validate code using their own tools. While the application will provide a public endpoint with additional functionality.

## About The Schemas

The schema uses the [JSON Schema](http://json-schema.org/) vocabulary to validate JSON documents.

It's intended to support validation of [JSON-LD](http://json-ld.org/) documents that conform the the [Modelling Opportunity Data](https://www.openactive.io/modelling-opportunity-data) specification.

The opportunity data specification uses properties from [Schema.org](https://schema.org) and the [the OpenActive vocabulary](https://www.openactive.io/ns/) to describe a number of different types of resource, e.g. Events, Places, Activity Lists, etc.

By default, the initial version of the schema focuses on validating a JSON-LD document which consists of an Event with nested descriptions of Places, etc. 

If you're validating data with a different entrance point then change the top-level `$ref` property to refer to one of the other `definitions`. For example if you want to validate a `Place`, then change the schema to this:

```
{
    "$schema": "http://json-schema.org/schema#",
    "title": "Modelling Opportunity Data Schema",
    "$ref": "#/definitions/place",
    ...
}    
```

By default the schema checks for strict conformance to the opportunity data specification. This means it will reject custom properties or additional properties from Schema.org. To make the schema more lax, then change the `additionalProperties` value to `true` in the relevant definition(s).

This type of switching will be handled automatically by the validation application. These notes are provided for people doing manual testing.

### Manual Validation

If you're doing manual checking of the data then you can use the following tools:

* [JSONLint](https://jsonlint.com/) for basic JSON syntax checking
* [JSON-LD playground](http://json-ld.org/playground/) will check basic JSON syntax and will also ensure documents are valid JSON-LD
* [JSON Schema Lint](https://jsonschemalint.com) for validating a JSON-LD document against the schema

JSON Schema Lint allows you to paste in the schema and a sample document and will give live validation messages as you revise the document.

### Current Limitations

The schemas are a work in progress, known issues are:

* Requires definition of `oa:ActivityOpportunity`
* `Schedule` needs more testing
* Some properties, e.g. `schema:image` can be a URL or an array. This isn't supported yet, but easy to add
* Place nesting via `containedInPlace` and `containsPlace1 is currently very permissive, need more constraints
* No support for custom JSON-LD contexts
