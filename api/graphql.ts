import { schema } from "nexus";
import { countryStatsResolver } from "./countryResolver";
      
schema.addToContext(req => {
  return {
    memoryDB: {
      worlds: [
        { id: "1", population: 6_000_000, name: "Earth" },
        { id: "2", population: 0, name: "Mars" }
      ],
    }
  }
})


      
schema.objectType({
  name: "Country",
  definition(t) {
    t.string("country")
    t.string("confirmedDeaths")
    t.string("confirmedCases")
    t.string("recovered")

  }
})
schema.objectType({
  name: "World",
  definition(t) {
    t.id("name")
    t.string("name")
    t.float("population")
  }
})
      
schema.queryType({
  definition(t) {        
    t.field("hello", {
      type: "World",
      args: {
        world: schema.stringArg({ required: false })
      },
      resolve(_root, args, ctx) {
        const worldToFindByName = args.world ?? "Earth"
        const world = ctx.memoryDB.worlds.find(w => w.name === worldToFindByName)
      
        if (!world) throw new Error(`No such world named "${args.world}"`)
      
        return world
      }
    })

      
    t.list.field('worlds', {
      type: 'World',
      resolve(_root, _args, ctx) {
        return ctx.memoryDB.worlds
      } 
    })
    t.list.field('countries', {
      type: 'Country',
      resolve: countryStatsResolver
    })
  }
})



