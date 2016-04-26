hugo-bootstrap-premium
======================
A theme with bootstrap, bootswatch(optional), font-awesome, highlightjs, popover opt-in form (optional), MailMunch (optional) and SumoMe (optional).

*NOTE: This theme is copied from Hyde-Y. Not everything is ported to bootstrap.
Feel free to make changes and open pull requests.*


<small>Forked from [Hyde-Y](https://github.com/enten/hyde-y)</small>

## Screenshots

![preview](https://raw.githubusercontent.com/appernetic/hugo-bootstrap-premium/master/images/screenshot2.png)

Hugo-bootstrap-premium theme used with ```showRightSidebar = true``` and ```[params.theme] name = "paper"``` .


![preview](https://raw.githubusercontent.com/appernetic/hugo-bootstrap-premium/master/images/screenshot.png)

Hugo-bootstrap-premium theme with default settings.


## Installation with Appernetic Static Site Generator as a Service

1. Select "Themes".
2. At the bottom of the Themes page paste the git link from GitHub (see image fig 1).
3. If you want to update your config settings file click the "Copy theme config" button in the theme modal popup (WARNING! The current settings file will be overwritten), otherwise follow step 4.
4. In Settings change the line under [params.popover] enablepopover = false if you don't use the popover.
5. To configure menues and footer you need access to the data folder, read more in section "Access data folders".
5. Click the button: Preview or Publish.
6. Wait 10 min or clear your local browser cache to see changes at GitHub. In preview content is updated imediatley but CSS changes need a cache clear to be visible.  


![preview](https://raw.githubusercontent.com/appernetic/hugo-bootstrap-premium/master/images/cloneatheme.png)

Figure 1. Copy git link from GitHub.

## Access data folders

In Appernetic.io you only have access to the Content folder and the config settings file.

To access the data folder you have two options:

Option 1

1. First fork this theme repo.
2. View your forked repo at GitHub in your browser, find the data folder and add a Menu.toml file.
2. Clone your forked repo in Appernetic.io

Option 2

1. Fork this repo.
2. Use Git or GitHub Desktop on your local computer to clone your forked theme repo.
3. Create a Menu.toml file in your data folder with you favorite editor.
4. Sync with your GitHub theme repo.

## Installation with Hugo

```
$ cd your_site_repo/
$ mkdir themes
$ cd themes
$ git clone https://github.com/appernetic/hugo-bootstrap-premium
```

See the [official Hugo themes documentation](http://gohugo.io/themes/installing) for more info.

## Usage

This theme expects a relatively standard Hugo blog/personal site layout:
```
.
└── content
    ├── post
    |   ├── post1.md
    |   └── post2.md
    ├── code
    |   ├── project1.md
    |   ├── project2.md
    ├── license.md        // this is used in the sidebar footer link
    └── other_page.md
```

Just run `hugo --theme=hugo-bootstrap-premium` to generate your site!

## Configuration

### Hugo

An example of what your site's `config.toml` could look like. All theme-specific parameters are under `[params]` and standard Hugo parameters are used where possible.

``` toml
# hostname (and path) to the root eg. http://spf13.com/
baseurl = "/" # In most cases this will work.

# Site title
title = "sitename"

# Copyright
copyright = "(c) 2015 yourname."

# Language
languageCode = "en-EN"

# Metadata format
# "yaml", "toml", "json"
metaDataFormat = "yaml"

# Theme to use (located in /themes/THEMENAME/)
theme = "hugo-bootstrap-premium"

# Pagination
paginate = 10
paginatePath = "page"

# Enable Disqus integration
disqusShortname = "your_disqus_shortname"

[permalinks]
    post = "/:year/:month/:day/:slug/"
    code = "/:slug/"

[taxonomies]
    tag = "tags"
    topic = "topics"

[author]
    name = "yourname"
    email = "yourname@example.com"

#
# All parameters below here are optional and can be mixed and matched.
#

# bootswatch theme name, unmark and select one: cerulean, cosmo, cyborg, darkly,
# default, flatly, journal,  lumen, paper, readable, sandstone, simplex,
# slate, spacelab, superhero, united, yeti.

[params.theme]
  name = "paper"

[params.popover]
  # This is a highly configurable popover form.
  enablepopover = false #enable or disable popover: true/false.
  posturl = "https://zapier.com/hooks/..."
  headerimage = "//placehold.it/1000x600"
  expirecookie = 5 #show it again after number of days to visitor that has not subscribed.
  cookiename = "mycookie1" #give the cookie a unique name variable (avoid spaces and strange characters).
  signupheader = "Join Our Newsletter"
  showmodaltimeout = 10000 #show popover modal after time interval in milliseconds.
  mouseleave = true #show popover when mouse leaves window: true/false.
  modalsize = "" #lg or sm. Empty is md. If phone is detected lg is used.
  imagedescription = "Placeholder image for this popover modal optin form"
  signuptext = "Signup today for free and be the first to get notified on new updates."
  inputplaceholder = "Enter your email"
  submitbutton = "Subscribe"
  successmessage = "Thanks for your subscription!"
  errormessage = "Submitting form failed!"
  optin = true #opt-in: true/false

[params]
    # You can use markdown here.
    BrandImage = "http://blog.appernetic.io/images/apperneticlogo.png" #top header brand image.
    brand = "Appernetic blog" # brand image alt text.
    topline = "few words about your site"
    footline = "code with <i class='fa fa-heart'></i>"

    # Show a sidebar menu
    showRightSidebar = true

    # Text for the top menu link, which goes the root URL for the site.
    # Default (if omitted) is "Home".
    home = "home"

    mailmunchid = "" # Mailmunch site id
    sumomeid = "" # Sumome id

    # Select a syntax highight.
    # Check the static/css/highlight directory for options.
    highlight = "default"

    # Google Analytics.
    googleAnalytics = "Your Google Analytics tracking code"

    # Sidebar social links.
    github = "enten/hugo-boilerplate" # Your Github profile ID
    bitbucket = "" # Your Bitbucket profile ID
    linkedin = "" # Your LinkedIn profile ID (from public URL)
    googleplus = "" # Your Google+ profile ID
    facebook = "" # Your Facebook profile ID
    twitter = "" # Your Twitter profile ID
    youtube = ""  # Your Youtube channel ID
    flattr = ""  # populate with your flattr uid

[blackfriday]
    angledQuotes = true
    fractions = false
    hrefTargetBlank = false
    latexDashes = true
    plainIdAnchors = true
    extensions = []
    extensionmask = []

```

### Menu

Create `data/Menu.toml` to configure the top menu navigation links. Example below.

```toml
[about]
    Name = "About"
    IconClass = "fa-info-circle"
    URL = "/about"

[posts]
    Name = "Posts"
    Title = "Show list of posts"
    URL = "/post"

[tags]
    Name = "Tags"
    Title = "Show list of tags"
    URL = "/tags"
```

### Foot menu

Create `data/FootMenu.toml` to configure the footer navigation links. Example below.

```toml
[license]
    Name = "license"
    URL = "/license"
```

## Popover e-mail subscription opt-in form

The popover e-mail opt-in form is a bootstrap modal (also commonly referred to as a light box). You can configure it in the config.toml settings file. It detects mobile devices and sets a cookie. It will use a large modal and large buttons for mobile devices. You can enable/disable it, configure delay, activate popover if mouse leave window, number of days to not show it to visitors that has not subscribed, show an image etc. It is perfect to use it with services such as Zapier in combination with Mailchimp. The form will POST the variables: Email as a string and Optin as a boolean to the URL of your choice. The variables is case sensitive.

Remember to change the cookie name in settings to a unique name if you use the popover, there is a very small possibility that a visitor from another website has a cookie set with the same name you have set.

The popover is built with:

* Angular.js 1.4.9
* angular-modal-service v0.6.8
* isMobile.js v0.3.9
* angular-storage

In static/js/popover/ you will find a minified and a un-minified version of popover.js.

### Workarounds to bugs that are not solved

* I couldn't use uibModalInstance. Somehow dots is escaped in variables that are between script tags in Hugo compiled html files. So it was not possible to pass url's from the config file to the angular app. Possible not tested workaround for uib modal is to use: {{ .Site.Params.popover.posturl | safeJS }}
* I had to use angular-modal-service and couldn't get animation to work. So therefore no animations!
* I could only get $location.absUrl() to work in Angular so I had to do my own function to make the modal to work in the preview (in Appernetic).

### Bugs

* If the POST url is wrong you will not get the error message in the popover. Instead you get a success message or only an error in the browser console such as: XMLHttpRequest cannot load https://zapier.com/hooks/. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://preview.appernetic.io' is therefore not allowed access. The response had HTTP status code 404.
* And yes, it works on GitHub Pages if you have the correct Zapier hook!

## Sumome and MailMunch forms

You can use the theme with both SumoMe and MailMunch by adding the respective id's. If you use MailMunch it is easy to have it send your subscribers to MailChimp.

## Tips

* If you've added `theme = "hugo-bootstrap-premium"` to your `config.toml`, you don't need to keep using the `--theme=hugo-bootstrap-premium` flag!
* Although all of the syntax highlight CSS files under the theme's `static/css/highlight` are bundled with the site, only the one you choose will be included in the page and delivered to the browser.
* Change the favicon by providing your own as `static/favicon.png` (and `static/touch-icon-144-precomposed.png` for Apple devices) in your site directory.
* Hugo makes it easy to override theme layout and behaviour, read about it [here](http://gohugo.io/themes/customizing).
* Pagination is set to 10 items by default, change it by updating `paginate = 10` in your `config.toml`.

## Changes and enhancements by Appernetic from the [Murali Rath](https://github.com/mmrath/hugo-bootstrap/) theme version

* Added popover e-mail subscription opt-in form.
* Added Sumome and MailMunch forms.
* Added more space between top menu and content.
* Removed ```class="clearfix"``` in sidebar links.
* Added instructions in the README for use with Appernetic.io.
* Added exampleSite folder.
* Added correct image links to images in the README file.

## Nown bugs

* Header image has no left margin in mobile devices.

## Changes and enhancements by [Murali Rath](https://github.com/mmrath/hugo-bootstrap/) from the original theme
* Modified to work with bootstrap and bootswatch
* ...many other small layout tweaks!

## Attribution

Obviously largely a port of the awesome [Hyde-Y](https://github.com/enten/hyde-y) theme.

## Questions, ideas, bugs, pull requests?

All feedback is welcome! Head over to the [issue tracker](https://github.com/appernetic/hugo-bootstrap-premium/issues).

## License

Open sourced under the [MIT license](https://github.com/enten/hyde-y/blob/master/LICENSE).
