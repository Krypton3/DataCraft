// pages/about.js

import { Spacer } from '@nextui-org/react';
import React from 'react';

export default function About() {
  return (
    <React.Fragment>
      <title>About DataCraft</title>
      <div style={{ padding: '40px', margin: '0 auto', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
        <Spacer y={2} />
        <div>
          <h1 style={{ 
            background: "linear-gradient(45deg, blue -20%, pink 50%)", 
            WebkitBackgroundClip: "text", 
            color: "transparent", 
            fontSize: "2.5rem", 
            marginBottom: "1rem"
          }}>
            About DataCraft
          </h1>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
          This service leverages the power of modern web technologies to create a fast and scalable full-stack application.
          </p>
          <Spacer y={2} />
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
          <strong>Next.js</strong> is at the core of the front end, offering server-side rendering, static site generation, and seamless integration with React. This service uses <strong>NextUI</strong> to provide a modern, responsive, customizable user interface that enhances the user experience.
          </p>
          <Spacer y={1} />
          <p><strong>Key Features of Next.js:</strong></p>
            <Spacer y={1} />
            <ul style={{ fontSize: '1.2rem', lineHeight: '1.6', paddingLeft: '20px' }}>
            <li><strong>Server-Side Rendering (SSR):</strong> Boosts performance and SEO by rendering pages server-side.</li>
            <li><strong>Static Site Generation (SSG):</strong> Pre-builds pages, blending benefits of SSR and static sites.</li>
            <li><strong>File-Based Routing:</strong> Simplifies routing with automatic, file-structure-based configuration.</li>
            <li><strong>Incremental Static Regeneration (ISR):</strong> Updates static pages without needing a full rebuild.</li>
            <li><strong>CSS and Sass Support:</strong> Provides built-in support for CSS and Sass styling.</li>
            </ul>
          <Spacer y={1} />
          <p><strong>Key Features of NextUI:</strong></p>
            <Spacer y={1} />
            <ul style={{ fontSize: '1.2rem', lineHeight: '1.6', paddingLeft: '20px' }}>
            <li><strong>Modern and Responsive Design:</strong> Provides sleek, responsive components that are easy to use and customize.</li>
            <li><strong>Built with TypeScript:</strong> Comes with TypeScript support, boosting productivity and code quality.</li>
            <li><strong>Customizable Themes:</strong> Offers light and dark themes with easy customization options.</li>
            <li><strong>Performance Optimized:</strong> Ensures fast load times and smooth interactions with optimized components.</li>
            <li><strong>Integration with Next.js:</strong> Works seamlessly with Next.js for building modern web applications.</li>
            </ul>
          <Spacer y={2} />
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
            On the back end, we use <strong>FastAPI</strong> to deliver high-performance APIs that serve our application’s needs. Our entire application is containerized using <strong>Docker</strong>, ensuring consistency across development and production environments.
          </p>
          <Spacer y={1} />
          <p><strong>Key Features of FastAPI:</strong></p>
            <Spacer y={1} />
            <ul style={{ fontSize: '1.2rem', lineHeight: '1.6', paddingLeft: '20px' }}>
            <li><strong>High Performance:</strong> Leverages async capabilities for speed and efficiency.</li>
            <li><strong>Automatic Interactive Documentation:</strong> Generates interactive API docs with Swagger UI and ReDoc.</li>
            <li><strong>Security Features:</strong> Built-in support for OAuth2, JWT, and other security protocols.</li>
            <li><strong>Data Serialization and Validation:</strong> Uses Pydantic models to ensure accurate data structure.</li>
            <li><strong>Supports SQL and NoSQL Databases:</strong> Integrates well with both SQL and NoSQL databases, and ORMs like SQLAlchemy.</li>
            </ul>
          <Spacer y={2} />
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
            We are committed to building services that is not only functional but also delightful to use. Our stack of Next.js, NextUI, FastAPI, and Docker allows us to achieve this with efficiency and elegance.
          </p>
        </div>
        <Spacer y={2} />
      </div>
    </React.Fragment>
  );
}
