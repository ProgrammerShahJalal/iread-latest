interface BlogCategory{
    title: string;
    image: string;
}

interface BlogTag{
    title: string;
}

interface Blog {
    blog_id: number;
    title: string;
    author_id: string;
    short_description: string;
    full_description: string;
    publish_date: string;
    cover_image?: string;
    slug: string;
    seo_title: string;
    seo_keyword: string;
    seo_description: string;
    categories: BlogCategory[];
    tags: BlogTag[];
}

