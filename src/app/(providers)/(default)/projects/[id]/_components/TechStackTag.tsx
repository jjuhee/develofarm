import React from "react"

const TechStackTag = () => {
  const techStack = [
    { id: "1", tech: "React" },
    { id: "2", tech: "TypeScript" },
    { id: "3", tech: "JAVA" },
    { id: "4", tech: "Figma" },
  ]

  return (
    <ul className="flex text-sm">
      {techStack.map((tech) => {
        return (
          <li
            className="border-solid border-2 p-2 pl-3 pr-3 mr-2 rounded-3xl border-rose-400 text-rose-400"
            key={tech.id}
          >
            {tech.tech}
          </li>
        )
      })}
    </ul>
  )
}

export default TechStackTag
