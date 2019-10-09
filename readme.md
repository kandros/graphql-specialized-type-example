# How to run

`npm install`  
`npm start`

## example query

```
{
  triggers {
    name
    type
    createdAt

    ... on TriggerRed {
      redField
      nestedRed {
        nestedFieldOnlyForRed
      }
    }

    ... on TriggerGreen {
      greenOnly {
        iLoveGreen
      }
    }
  }
}
```
