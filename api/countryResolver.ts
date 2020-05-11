import axios from "axios"
export const countryStatsResolver = async () => {
  const response = await axios.get("https://api.thevirustracker.com/free-api?countryTotals=ALL")
  const [countries] = response.data.countryitems
  const countriesArr = Object.entries(countries)
  const result = countriesArr.map(item => {
    const [key,entry] = item  
    return {
      country: `${entry.title}`,
      confirmedDeaths: `${entry.total_deaths}`,
      confirmedCases: `${entry.total_cases}`,
      recovered: `${entry.total_recovered}`,
    }
  })
  return result  
}