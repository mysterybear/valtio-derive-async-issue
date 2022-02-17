import React, { Suspense } from "react"
import { proxy, useSnapshot } from "valtio"
import { derive } from "valtio/utils"

const asyncStore = proxy({
  users: fetch("https://reqres.in/api/users").then((res) => res.json()),
})

const derivedAsyncStore = derive({
  doo: async (get) => {
    return await get(asyncStore.users)
  },
})

const AsyncStuff = () => {
  const { doo } = useSnapshot(derivedAsyncStore)
  return (
    <div>
      <pre>{JSON.stringify({ doo }, null, 2)}</pre>
    </div>
  )
}

function App() {
  return (
    <div>
      <Suspense fallback={null}>
        <AsyncStuff />
      </Suspense>
    </div>
  )
}

export default App
