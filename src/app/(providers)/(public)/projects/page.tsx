import EmptyState from "@/components/EmptyState"
import React from "react"
import ProjectCard from "./_components/ProjectCard"

const ProjectsPage = () => {
  return (
    <div>
      {/* category */}

      {/* projects */}
      <div className="flex flex-col gap-8">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>

      {/* TODO: length가 0 이면  EmptyState */}
    </div>
  )
}

export default ProjectsPage
