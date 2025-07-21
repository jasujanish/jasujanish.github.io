import React from "react";
import { content } from "../content/course_content";
import StandardSubPage from "./standard_sub_page";

export default function CoursesPage() {
  return (
    <StandardSubPage
      page_name="courses"
      content={content}
      idx={1}
    />
  );
}