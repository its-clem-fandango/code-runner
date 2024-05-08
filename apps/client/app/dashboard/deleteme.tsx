import React from "react"

export default function Profile() {
  const interests = ["Cats 🐱", "Guitar 🎸", "Film 🎬"]
  const skills = ["React", "Node.js", "Product-oriented Development"]
  return (
    <>
      <p>Passionate about React.js, TypeScript, and art.</p>
      <p>Interests: {interests.map((interest) => `${interest} `)}</p>
      <p>
        <strong>Skills:</strong> {skills.map((skill) => `${skill} `)}
      </p>
    </>
  )
}
