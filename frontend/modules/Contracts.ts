const cache: any = {}

async function importJsonOrEnv<T>(name: string, envVar: string): Promise<T> {
  if (cache[name]) {
    console.log(`Cache hit for ${name}.json 🎉`)
    return cache[name] as T
  }

  try {
    const importedJson = await import(
      `/deployments/optimismSepolia/${name}.json`
    )
    console.log(`Successfully imported ${name}.json 🥳`)

    cache[name] = importedJson.default
    return importedJson.default as T
  } catch (error) {
    console.error(
      `Failed to import ${name}.json, checking environment variable...`,
    )
    const url = process.env[envVar]
    if (!url) {
      throw new Error(`Environment variable ${envVar} not found.`)
    }
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`)
    }
    const jsonData = await response.json()
    console.log(`Successfully fetched ${name} from ${url}`)

    cache[name] = jsonData
    return jsonData as T
  }
}

export async function loadContracts() {
  const UserRegistry = await importJsonOrEnv<any>(
    'UserRegistry',
    'NEXT_PUBLIC_CONTRACT_UserRegistry',
  )
  const CheckInManager = await importJsonOrEnv<any>(
    'CheckInManager',
    'NEXT_PUBLIC_CONTRACT_CheckInManager',
  )
  const EventManager = await importJsonOrEnv<any>(
    'EventManager',
    'NEXT_PUBLIC_CONTRACT_EventManager',
  )

  return { UserRegistry, CheckInManager, EventManager }
}
