### laravel **schema** to manipulate **tables**
´´´php
//We can drop columns in a table
Schema:table('posts', function(Blueprint $table){
    $table->dropColumn('summery');

    //Also is possible to pass an array
    $table->dropColumn(['like_id', 'comment_id']);
    
})

//But what if i just want to rename the column? erase and remake?
//Yes! you could do that, or....
Schema:table('posts', function(Blueprint $table){
    //You must have in mind is not supported the rename of a table with a enum column
    $table->renameColumn('users_id', 'user_id);
})

//Just remember to validate if the columns exists first!
if(Schema::hasColumn('posts', 'post_id')){
    Schema::table('posts', function(Blueprint $table){
        $table->removeColumn('post_id');
    })
}

//To create foreign key constraint in laravel, we have a shorthand!!

//large way
Schema::table('posts', function(Blueprint $table){
    $table->unsignedBigInteger('user_id);
    $table->foreign('user_id')->references('id')->on('users');
})

//short hand applied with table validation, constrained method can go empty so would use convention to stablish table name and column
if(Schema::hasTable('posts')){
    Schema::table('posts', function(Blueprint $table){
        $table->foreignId('group_id')->constrained('groups');
    })
}

//We can add the --onDelete, onUpdate-- methods behavior after the --constrained-- method, and the column modifiers before it.
Schema::table('posts', function(Blueprint $table){
    $table->foreignId('recomendation_id')->nullable()->constrained()->onUpdate('cascade')->onDelete('cascade');
})

//
´´´
### Upload a file
Upload a file with laravel is very easy, the html part is so similar to what we would have in a project without laravel, the only thing that would change is, here we add one line ! That is because Laravel has some security against ['CSRF'](), so the the *post* has a token wich must be declare in the *.blade.php* file, so you must put **@CSRF** inside the form you want to post.
```html
<?php

<form action="" method="post" enctype="multipart/form-data">
    @CSRF
    <label for="picture">Upload a good picture !, someone would understand ! and someone would be glad to see it !</label>
    <input type="file" name="picture" id="picture">
    <input type="submit" value="upload">
</form>
```
Then in the server we can call the image from the request object ! The reques->image has some properties and methods that make it too easy to work with it, like move and extension.
```php
use Illuminate\Http\Request;

public function uploadPicture(Request $request){
    $request->validate([
        'image' => 'required|image|mimes:jpg,png,svg|max:2048'
    ])
    $imageName = time() . $request->image->extension;
    $request->image->move(public_path('images'), $imageName);
}
```
### Ajax with laravel
As Laravel uses **CSRF**(CROSS-SITE REQUEST FORGERING) you must add an *CSRF token* in ajax posts wich you get from the server, to do that you can change the default header property of axios or add the header in every post.

Remember you can only give the token from the server, so you can't change the script files but if you have the script on the .blade.php file, then you can directly add the token on the axios instead of another tag.
```js
//axios default header changed with script on the .blade.php
axios.default.header.common= {
    'x-csrf-token': "{{csrf_token()}}"
}

//axios header per post, within script file
let data={username:'videnacry', text:'I heard an emotion was a bunch of energy you can use, even to change the emotion itself, to say it like that'}
axios.post('add_post',data,{headers:{'x-csrf-token':document.querySelector('meta[name="crsf_token"]').getAttribute('content')}})
```