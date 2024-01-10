import EmptyState from "@/components/EmptyState"
import React from "react"
import ProjectCard from "./_components/ProjectCard"

const ProjectsPage = () => {
  return (
    <div>
      {/* category */}

      {/* projects */}

      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />

      {/* TODO: length가 0 이면  EmptyState */}
    </div>
  )
}

export default ProjectsPage
