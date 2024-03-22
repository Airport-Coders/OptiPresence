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
    let url = null

    // Workaround for Vercel environment variables not being available with process.env[envVar]
    if (envVar === 'NEXT_PUBLIC_CONTRACT_UserRegistry') {
      url = process.env.NEXT_PUBLIC_CONTRACT_UserRegistry
    } else if (envVar === 'NEXT_PUBLIC_CONTRACT_CheckInManager') {
      url = process.env.NEXT_PUBLIC_CONTRACT_CheckInManager
    } else if (envVar === 'NEXT_PUBLIC_CONTRACT_EventManager') {
      url = process.env.NEXT_PUBLIC_CONTRACT_EventManager
    }

    console.log(`Environment variable ${envVar} found: ${url}`)
    if (!url) {
      console.log(`Environment variable ${envVar} not found.`)
      throw new Error(`Environment variable ${envVar} not found.`)
    }
    const response = await fetch(url)
    if (!response.ok) {
      console.log(`Failed to fetch ${url}: ${response.statusText}`)
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
