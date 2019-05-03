import * as React from "react"
import { MeComponent } from "../generated/apolloComponents"
import Layout from "../components/Layout"

export default () => {
  return (
    <Layout title="My Info">
      <MeComponent>
        {({ data }) => (
          <div>{data && data.me ? data.me.name : "loading..."}</div>
        )}
      </MeComponent>
    </Layout>
  )
}
