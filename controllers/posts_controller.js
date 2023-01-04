const Post=require('../models/post');
const Comment=require('../models/comment');

/* module.exports.create= function(req,res){
    console.log("checking ",req.user);
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){
            console.log('error in creating a post',err);
            return;
        }
        return res.redirect('back');
    });
} */
module.exports.create = async function(req, res){
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        req.flash('success','Post published!');
        return res.redirect('back');

    }catch(err){
        // console.log('Error', err);
        // return;
        req.flash('error',err);
        return res.redirect('back');
    }
  
}

/* module.exports.destroy=function(req,res){
    Post.findById(req.params.id,function(err,post){
        //.id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();
            Comment.deleteMany({post:req.params.id},function(err){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    });
} */
module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});
            req.flash('success','Post and associated comments deleted!');
            return res.redirect('back');
        }else{
            req.flash('error','You can not delete this post!');
            return res.redirect('back');
        }

    }catch(err){
        // console.log('Error', err);
        // return;
        req.flash('error',err);
        return res.redirect('back');
    }
    
}