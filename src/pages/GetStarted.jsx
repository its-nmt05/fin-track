import { Accordion, AccordionItem, Spinner } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { Footer } from "../components"
import databaseService from "../supabase/database"
import parse from "html-react-parser"

function GetStarted() {
  const [contentData, setContentData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    databaseService
      .getAppData({ section: "get_started" })
      .then(({ data, error }) => {
        if (!error) {
          setIsLoading(false)
          setContentData(data.content)
        }
      })
  }, [])

  return !isLoading ? (
    <div className="space-y-6">
      <Accordion variant="splitted">
        {contentData.map((item) => {
          const { title, content, id } = item
          return (
            <AccordionItem
              key={id}
              title={<p className="font-medium">{title}</p>}
            >
              <div className="browser-css">{parse(content)}</div>
            </AccordionItem>
          )
        })}
      </Accordion>
      <Footer />
    </div>
  ) : (
    <div className="flex min-h-screen justify-center items-center">
      <Spinner size="lg" />
    </div>
  )
}

export default GetStarted
