
document.addEventListener('DOMContentLoaded', () => {
    const feedContainer = document.getElementById('bluesky-feed');
    const headerContainer = document.getElementById('bluesky-header');
    const actor = 'ivaramburu.bsky.social';
    const limit = 20; // Fetch more to allow scrolling
    const feedUrl = `https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${actor}&limit=${limit}&filter=posts_no_replies`;
    const profileUrl = `https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${actor}`;

    // Helper to calculate relative time
    function timeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) return `${seconds}s`;
        if (minutes < 60) return `${minutes}m`;
        if (hours < 24) return `${hours}h`;
        if (days < 7) return `${days}d`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    // Helper to render embeds (images, external cards)
    function renderEmbed(embed) {
        if (!embed) return '';
        
        // Handle Images
        if (embed.$type === 'app.bsky.embed.images#view' || embed.$type === 'app.bsky.embed.images') {
            const images = embed.images || [];
            if (images.length === 0) return '';
            
            return `
                <div class="bluesky-images">
                    ${images.map(img => `
                        <div class="bluesky-image-wrapper">
                            <img src="${img.thumb}" alt="${img.alt || 'Bluesky image'}" loading="lazy" />
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        // Handle External Links (Cards)
        if (embed.$type === 'app.bsky.embed.external#view' || embed.$type === 'app.bsky.embed.external') {
            const external = embed.external;
            if (!external) return '';
            return `
                <a href="${external.uri}" target="_blank" class="bluesky-card">
                    ${external.thumb ? `<div class="card-thumb" style="background-image: url('${external.thumb}')"></div>` : ''}
                    <div class="card-info">
                        <div class="card-title">${external.title || ''}</div>
                        <div class="card-desc">${external.description || ''}</div>
                        <div class="card-url">${new URL(external.uri).hostname}</div>
                    </div>
                </a>
            `;
        }
        
        return '';
    }

    // Fetch Profile Data for Header
    fetch(profileUrl)
        .then(res => res.json())
        .then(profile => {
            if (headerContainer && profile) {
                headerContainer.innerHTML = `
                    <div class="bsky-header-col bsky-header-avatar">
                        <a href="https://bsky.app/profile/${profile.handle}" target="_blank">
                            <img src="${profile.avatar}" alt="${profile.displayName}">
                        </a>
                    </div>
                    <div class="bsky-header-col bsky-header-info">
                        <a href="https://bsky.app/profile/${profile.handle}" target="_blank" class="header-name-link">
                            <span class="header-display-name">${profile.displayName}</span>
                            <span class="header-handle">@${profile.handle}</span>
                        </a>
                    </div>
                    <div class="bsky-header-col bsky-header-logo">
                        <a href="https://bsky.app/profile/${profile.handle}" target="_blank">
                            <svg viewBox="0 0 600 530" width="32" style="width: 32px; height: 28px;" xmlns="http://www.w3.org/2000/svg">
                                <path d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z" fill="#1185fe"/>
                            </svg>
                        </a>
                    </div>
                `;
            }
        });

    fetch(feedUrl)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            if (!data.feed || data.feed.length === 0) {
                feedContainer.innerHTML = '<p>No posts found.</p>';
                return;
            }

            let html = '';
            data.feed.forEach(item => {
                const post = item.post;
                const record = post.record;
                const author = post.author;
                const postUrl = `https://bsky.app/profile/${author.handle}/post/${post.uri.split('/').pop()}`;
                const timeString = timeAgo(record.createdAt);
                
                // Check if it's a repost
                // The API structure for reposts in feed is: item.reason?.$type === 'app.bsky.feed.defs#reasonRepost'
                let repostHeader = '';
                if (item.reason && item.reason.$type === 'app.bsky.feed.defs#reasonRepost') {
                    const repostedBy = item.reason.by;
                    repostHeader = `
                        <div class="repost-indicator">
                            <svg viewBox="0 0 576 512" width="12" height="12" fill="#536471" style="margin-right:4px;"><path d="M272 416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160c-17.7 0-32-14.3-32-32V192h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l32 0 0 128c0 53 43 96 96 96H272zM304 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l112 0c17.7 0 32 14.3 32 32l0 128H416c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8l-32 0V160c0-53-43-96-96-96L304 96z"/></svg>
                            Reposted by ${repostedBy.displayName || repostedBy.handle}
                        </div>
                    `;
                }

                html += `
                    <div class="bluesky-post">
                        ${repostHeader}
                        <div class="post-header-row">
                            <a href="https://bsky.app/profile/${author.handle}" target="_blank" class="post-avatar-link">
                                <img src="${author.avatar}" alt="${author.displayName}" class="post-avatar">
                            </a>
                            <div class="post-meta-col">
                                <a href="https://bsky.app/profile/${author.handle}" target="_blank" class="post-name-link">
                                    <span class="post-display-name">${author.displayName}</span>
                                    <span class="post-handle">@${author.handle}</span>
                                </a>
                                <div class="post-time-row">
                                     <a href="${postUrl}" target="_blank" class="post-time">${timeString}</a>
                                </div>
                            </div>
                        </div>
                        <div class="post-content-row">
                            <div class="post-text">${record.text}</div>
                            ${renderEmbed(post.embed)}
                        </div>
                    </div>
                `;
            });

            feedContainer.innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching Bluesky feed:', error);
            feedContainer.innerHTML = '<p>Failed to load updates.</p>';
        });
});
