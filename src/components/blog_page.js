import React from 'react';
import {content} from '../content/blog_content';
import StandardSubPage from './standard_sub_page';

export default function BlogPage() {
  return (
    <StandardSubPage page_name="about" content={content} idx={2}/>
  );
}