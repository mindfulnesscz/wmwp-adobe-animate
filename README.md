
# WMWP Adobe Animate

Simple Wordpress block to insert animations from Adobe animate javascript exports.

## How to prepare animation

There are some silly rules to follow in order to make the animation embed properly:

- Name of the file needs to be called **wmwpanim.fla**<br>
(That's because AA code uses source .fla file name as function name in generated javascript. This function called in our code is constant "wmwpanim()". At least for now. Thus the file has to be named wmwpanim.fla)

- In Gutenberg block options fill the ID from generated .html file from AA and url leading to source .js file generated.

- No other options like responsiveness or alignment is not supported at the moment.
  





  
