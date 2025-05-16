import PartialBlogArticle from '@/components/pages-partials/blogs-article';
import dynamic from 'next/dynamic';
import React from 'react';
const DynamicBlogs = dynamic(() => import('@/components/pages-partials/blogs-article'), {
  ssr: false
  // loading: () => <FullPageDashboardSkeleton />,
});
export default function Blog() {
  return <DynamicBlogs />;
}
