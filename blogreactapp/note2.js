const CreateBlog = () => {
  const [blog, setBlog] = useState({ title: '', content: '' });
  const [category, setCategory] = useState([
    { id: 1, value:'Technology'},
    { id: 2, value: 'Health' }  
])

  const handleChange = e => setBlog({ ...blog, [e.target.name]: e.target.value });
  const handleFileChange = e => setBlog({ ...blog, [e.target.name]: e.target.files[0] })
  const categories = () => category.map( each_category => <option key={each_category.id} value={each_category.id}>{each_category.value}</option>)

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('image', blog.image)
    formData.append('content', blog.content)
    formData.append('title', blog.title)
    formData.append('author', blog.author)
    formData.append('category', blog.category)
    const res = await fetch('', {
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: formData
      // body: JSON.stringify(blog),not
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="create-blog-container">
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <input type="file" name="image" onChange={handleFileChange} />
        <input name="title" placeholder="Blog Title" onChange={handleChange} />
        <input type='text' name="author" onChange={handleChange} placeholder="author name" />
        <select name="category" onChange={handleChange}>
          <option value="">Select Category</option>
          {categories()}
        </select>
        <textarea name="content" placeholder="Blog Content" onChange={handleChange}></textarea>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};


const getAllPosts = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    // console.log(blogPosts.split(','))
    useEffect(() => {
        fetchBlogPosts();
    }, []);

    const fetchBlogPosts = async() => {
        try {
            const response = await fetch("", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const myres = await response.json();
            setBlogPosts(myres);
            console.log(myres)
            
        } catch (error) {
            console.error("Error fetching blog posts:", error);
        }

    }
    // console.log(blogPosts);
    return (
        <div>
            <div className="blogContent">
                {/*  */}
            {
                blogPosts.map((each_Post) => (
                    <Link key={each_Post._id} to={`/${each_Post.slug}`}>
                        <div className>
                            <img width={300} height={300} src={`http://localhost:4001/${each_Post.img.replace('\\', '/')}`} alt="first content image"></img>
                            <p>{each_Post.title}</p>
                        </div>
                    </Link>
                ))
            }   
            </div>
        </div>
    );
}

function GetSinglePost() {
    const params = useParams();
    const postId = params.id;
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!postId) return;
        async function fetchPost() {
            setLoading(true);
            try {
                const res = await fetch(``);
                
                const data = await res.json();
                setPost(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [postId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!post) return <div>No post found.</div>;

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {post.image && <div><strong>Image:</strong> {post.image}</div>}
        </div>
    );
}

function UpdatePost() {
    const params = useParams();
    const postId = params.id;
    const [data, setData] = useState({ title: '', content: '', image: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!postId) return;
        async function fetchPost() {
            try {
                const res = await fetch(``);
                
                const post = await res.json();
                setData({
                    title: post.title || '',
                    content: post.content || '',
                    image: post.image || null
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [postId]);

    function handleChange(event) {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    }

    function handleFileChange(event) {
        setData({ ...data, [event.target.name]: event.target.files[0] });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const postData = {
            title: data.title,
            content: data.content,
            image: data.image && data.image.name ? data.image.name : data.image || null
        };
        try {
            const response = await fetch(``, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            if (!response.ok) throw new Error('Failed to update post');
            const updated = await response.json();
            alert('Post updated!');
        } catch (err) {
            setError(err.message);
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" name="title" value={data.title} onChange={handleChange} />
                </div>
                <div>
                    <label>Content</label>
                    <textarea name="content" rows="10" value={data.content} onChange={handleChange}></textarea>
                </div>
                <div>
                    <label>Image</label>
                    <input type="file" name="image" onChange={handleFileChange} />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

function DeletePost() {
    const params = useParams();
    const postId = params.id;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    async function handleDelete() {
        if (!postId) return;
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(``, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('Failed to delete post');
            setSuccess(true);
            setTimeout(() => navigate('/'), 1500); // Redirect after 1.5s
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h2>Delete Post</h2>
            {error && <div style={{color:'red'}}>Error: {error}</div>}
            {success ? (
                <div style={{color:'green'}}>Post deleted! Redirecting...</div>
            ) : (
                <button onClick={handleDelete} disabled={loading}>
                    {loading ? 'Deleting...' : 'Delete Post'}
                </button>
            )}
        </div>
    );
}