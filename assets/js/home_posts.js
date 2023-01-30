{
  // method to submit the form data for new posts using AJAX
  let createPost = function () {
    let newPostForm = $("#new-post-form");
    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/post/create-post",
        data: newPostForm.serialize(),
        success: function (data) {
          console.log(data);
          let newPost = newPostDom(data.data.post);
          $("#posts-list-container>ul").prepend(newPost);
          deletePost($(" delete-post-button", newPost));
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  //method to create a post in DOM

  let newPostDom = function (post) {
    return $(`<li id="post-${post._id}">
    <p id="content">
      
      <small>
        <a class="delete-post-button" href="/post/destroy/${post._id}">X </a>
      </small>
  
     ${post.content}<br />
      <small id="date">${post.user.name}</small>
    </p>
  
    <div class="post-comment">
      <form action="/comment/create/?id=${post._id}" method="POST" required>
        <input id="cmt" name="content" />
        <input type="submit" value="post" />
      </form>
    </div>

    <div class="post-comment-list">
  <ul id="post-comment-${post._id}">
    
  </ul>
</div>
    
  </li>`);
  };

  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#post-${data.data.post_id}`).removed();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  // let deleteComment = function (deleteLink) {
  //   $(deleteLink).click(function (e) {
  //     e.preventDefault();

  //     $.ajax({
  //       type: "get",
  //       url: $(deleteLink).prop("href"),
  //       success: function (data) {
  //         $(`#comment-list-${data.data.comment_id}`).removed();
  //         // req.flash("success", "Deleted");
  //       },
  //       error: function (error) {
  //         console.log(error.responseText);
  //       },
  //     });
  //   });
  // };

  // using Noty

  // $(function () {
  //   let callNoty = (message, type) => {
  //     new Noty({
  //       theme: "relax",
  //       text: message,
  //       type: type,
  //       layout: "topRight",
  //       timeout: 1500,
  //     }).show();

  //     new Noty({
  //       theme: "relax",
  //       text: "Error",
  //       type: "error",
  //       layout: "topRight",
  //       timeout: 1500,
  //       animation: {
  //         open: "animated bounceInRight",
  //         close: "animated bounceOutRight", // Animate.css class names
  //       },
  //     }).show();
  //   };
  // });

  createPost();
}
