import dynamic from 'next/dynamic'
import React from 'react'

const CodeEditor = dynamic(() => import('../../components/ui/MonacoCodeEditor'))

export default function EditorScreen() {
  return (
    <>
      <CodeEditor />
    </>
  )
}
