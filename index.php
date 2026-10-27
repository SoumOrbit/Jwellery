<?php
// If running under XAMPP Apache server, serve the compiled production build
if (file_exists(__DIR__ . '/dist/index.html')) {
    $content = file_get_contents(__DIR__ . '/dist/index.html');
    // Ensure relative paths work correctly under /Jwellery/
    echo str_replace('./assets/', 'dist/assets/', $content);
} else {
    echo "<h1>LUMIÈRE Haute Joaillerie</h1><p>Please run <code>npm run build</code> or <code>npm run dev</code> to launch the application.</p>";
}
