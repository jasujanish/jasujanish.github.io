import React from 'react';
import {content} from '../content/projects_content';
import StandardSubPage from "./standard_sub_page";

export default function ProjectsPage() {
  return (
    <StandardSubPage page_name="projects" content={content} idx={3} />
  );
}