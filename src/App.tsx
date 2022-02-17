import React, { Suspense } from "react"
import { proxy, useSnapshot } from "valtio"
import { proxyWithComputed } from "valtio/utils"

const asyncStore = proxy({
  users: fetch("https://reqres.in/api/users").then((res) => res.json()),
})

// const derivedAsyncStore = derive({
//   doo: async (get) => {
//     return await get(asyncStore.users)
//   },
// })

const derivedAsyncStore = proxyWithComputed(
  {
    users: asyncStore.users,
  },
  {
    strung: (get) => JSON.stringify(get.users),
  }
)

const AsyncStuff = () => {
  const { users, strung } = useSnapshot(derivedAsyncStore)
  return (
    <div>
      <pre>{JSON.stringify({ users, strung }, null, 2)}</pre>
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
