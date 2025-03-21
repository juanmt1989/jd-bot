import React,{ useEffect, useState } from 'react'
import { storage } from 'webextension-polyfill'
import { getCurrentTab } from '../../helpers/tabs'

export const Counter = () => {
  const [value, setValue] = useState()

  useEffect(() => {
    const readBackgroundMessage = async () => {
      const tab = await getCurrentTab()
      debugger
      const tabId = tab.id

      if (tabId) {
        const data = await storage.local.get(tabId.toString())
        const currentValue = data?.[tabId] ?? 0

        setValue(currentValue)
      }
    }

    readBackgroundMessage()
  }, [])

  return (
    <div
    //this style represent the position of the click 
      // style={{
      //   height: '100vh',
      //   fontSize: '24px',
      //   display: 'flex',
      //   alignItems: 'center',
      //   justifyContent: 'center',
      // }}
    >
      Clicks: {value}
    </div>
  )
}
