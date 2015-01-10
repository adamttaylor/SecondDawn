<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */
 
//define('WP_HOME','http://wamp_seconddawn.com');
//define('WP_SITEURL','http://wamp_seconddawn.com');
//define('DB_NAME', 'seconddawn');


define('WP_HOME','http://2dsandbox.legynds.com/');
define('WP_SITEURL','http://2dsandbox.legynds.com/');
define('DB_NAME','legynds_2dsandboxV2');

/*

sandbox
l0stc@stle

sandbox
getoffmylawn

legynds
m!r@nda
/*
/** MySQL database username */
define('DB_USER', 'legynds');

/** MySQL database password */
define('DB_PASSWORD', 'm!r@nda');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '43_aqS_T2RfVMy3KtkssGR*MeBbpiBtOc39sLLJw}z* gR$A`Bdza%B!X>bE*~ZW');
define('SECURE_AUTH_KEY',  's,C/4< 971M0Ot^76+D(.Pe{w3!by-_:M>o@hii2>m,p`20LrUj9<0&Tt onExr?');
define('LOGGED_IN_KEY',    '`.*^X+.25_%Vkuo0Qv`h|r**}y[(4%KP]O|WH2:y4rS^9Q$*Na!}/]^NQ$<>c6tL');
define('NONCE_KEY',        '-hGw*}##pxT)//Ni!_@.(d?1Q(*{qigm-KWE048,wh@;r5&F*{Tr8NMEl:j-R[:^');
define('AUTH_SALT',        'ukC|qD9tPtg3hSGPFRgr.ZmVkeOB}yK_4b<@w@58jE`$51u0JQfw}8]7&!5CPso~');
define('SECURE_AUTH_SALT', '25Fhz&!XT=h&XH2zg3lk93jBD@Hjz1N`jw.VBH$Jm9sB@xC!Idtjn.RXOLl2!:R-');
define('LOGGED_IN_SALT',   '}-qycD0xJoMkW# ><6-$LpyJqm9n^MES}3`|>2$QhG`sVLE#QSLH|v<KX0]Kqf-<');
define('NONCE_SALT',       ';lz(o0nBT?7/yhY$nx>u3nR>nftQdEZ]8AoAwd>2m#^RKBDq(Fr{.x&M01*:U~@+');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
