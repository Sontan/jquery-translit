jquery-translit
===============

installation
------------

Include script *after* the jQuery library:

```html
<script src="/path/to/jquery.translit-0.1.3.js"></script>
```

usage
-----

Replace the existing values of the elements with transliterated ones:

```javascript
// $('input').val() -> 'Официант, 400 капель валерьянки и салат!'
$('input').translit();
// $('input').val() -> '"Ofitciant, 400 kapel valerianki i salat!"'
```

Change the value of another element with the transliterated value of this
one:

```javascript
// $('input#input-1').val() -> 'Мы не бандиты! Мы благородные пираты!'
// $('input#input-2').val() -> ''
$('input#input-1').translit('send', 'input#input-2');
// $('input#input-1').val() -> 'Мы не бандиты! Мы благородные пираты!'
// $('input#input-2').val() -> 'My ne bandity! My blagorodnye piraty!'
```

Change the value of the this element with the transliterated value of another
one:

```javascript
// $('input#input-1').val() -> ''
// $('input#input-2').val() -> 'Если коровы начнут летать, то мне в космосе
//                              делать нечего'
$('input#input-1').translit('receive', 'input#input-2');
// $('input#input-1').val() -> 'Esli korovy nachnut letat, to mne v kosmose
//                              delat nechego'
// $('input#input-2').val() -> 'Если коровы начнут летать, то мне в космосе
//                              делать нечего'
```

Watch the value of another element and change the value of current one with
it's transliterated equivalent on-the-fly:

```javascript
$('input#input-1').translit('watch', 'input#input-2');
```

Same as above, but stop watching if value of the current element is changed
manually:

```javascript
$('input#input-1').translit('watch', 'input#input-2', true);
```

Stop watching:

```javascript
$('input#input-1').translit('unwatch');
```

Transliterate a string:

```javascript
$.fn.translit('exec', 'Прица Говорун отличается умом и сообразительностью')
// -> "Pritca Govorun otlichaetsia umom i soobrazitelnostiu"
```
