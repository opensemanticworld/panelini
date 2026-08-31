# {py:mod}`panelini.user`

```{py:module} panelini.user
```

```{autodoc2-docstring} panelini.user
:allowtitles:
```

## Module Contents

### Classes

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`CookieSetterPane <panelini.user.CookieSetterPane>`
  - ```{autodoc2-docstring} panelini.user.CookieSetterPane
    :summary:
    ```
````

### Functions

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`ensure_anonymous_cookie <panelini.user.ensure_anonymous_cookie>`
  - ```{autodoc2-docstring} panelini.user.ensure_anonymous_cookie
    :summary:
    ```
* - {py:obj}`default_user_resolver <panelini.user.default_user_resolver>`
  - ```{autodoc2-docstring} panelini.user.default_user_resolver
    :summary:
    ```
* - {py:obj}`display_name <panelini.user.display_name>`
  - ```{autodoc2-docstring} panelini.user.display_name
    :summary:
    ```
* - {py:obj}`resolve_user <panelini.user.resolve_user>`
  - ```{autodoc2-docstring} panelini.user.resolve_user
    :summary:
    ```
````

### Data

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`UserResolver <panelini.user.UserResolver>`
  - ```{autodoc2-docstring} panelini.user.UserResolver
    :summary:
    ```
* - {py:obj}`COOKIE_NAME <panelini.user.COOKIE_NAME>`
  - ```{autodoc2-docstring} panelini.user.COOKIE_NAME
    :summary:
    ```
* - {py:obj}`COOKIE_MAX_AGE_SECONDS <panelini.user.COOKIE_MAX_AGE_SECONDS>`
  - ```{autodoc2-docstring} panelini.user.COOKIE_MAX_AGE_SECONDS
    :summary:
    ```
* - {py:obj}`LOCAL_USER_ID <panelini.user.LOCAL_USER_ID>`
  - ```{autodoc2-docstring} panelini.user.LOCAL_USER_ID
    :summary:
    ```
* - {py:obj}`GUEST_LABEL <panelini.user.GUEST_LABEL>`
  - ```{autodoc2-docstring} panelini.user.GUEST_LABEL
    :summary:
    ```
````

### API

````{py:data} UserResolver
:canonical: panelini.user.UserResolver
:value: >
   None

```{autodoc2-docstring} panelini.user.UserResolver
```

````

````{py:data} COOKIE_NAME
:canonical: panelini.user.COOKIE_NAME
:value: >
   'panelini_uid'

```{autodoc2-docstring} panelini.user.COOKIE_NAME
```

````

````{py:data} COOKIE_MAX_AGE_SECONDS
:canonical: panelini.user.COOKIE_MAX_AGE_SECONDS
:value: >
   31536000

```{autodoc2-docstring} panelini.user.COOKIE_MAX_AGE_SECONDS
```

````

````{py:data} LOCAL_USER_ID
:canonical: panelini.user.LOCAL_USER_ID
:value: >
   'local'

```{autodoc2-docstring} panelini.user.LOCAL_USER_ID
```

````

````{py:data} GUEST_LABEL
:canonical: panelini.user.GUEST_LABEL
:value: >
   'Guest'

```{autodoc2-docstring} panelini.user.GUEST_LABEL
```

````

`````{py:class} CookieSetterPane(**params)
:canonical: panelini.user.CookieSetterPane

Bases: {py:obj}`panel.reactive.ReactiveHTML`

```{autodoc2-docstring} panelini.user.CookieSetterPane
```

```{rubric} Initialization
```

```{autodoc2-docstring} panelini.user.CookieSetterPane.__init__
```

````{py:attribute} cookie
:canonical: panelini.user.CookieSetterPane.cookie
:value: >
   'String(...)'

```{autodoc2-docstring} panelini.user.CookieSetterPane.cookie
```

````

`````

````{py:function} ensure_anonymous_cookie() -> tuple[str, panelini.user.CookieSetterPane | None]
:canonical: panelini.user.ensure_anonymous_cookie

```{autodoc2-docstring} panelini.user.ensure_anonymous_cookie
```
````

````{py:function} default_user_resolver() -> str
:canonical: panelini.user.default_user_resolver

```{autodoc2-docstring} panelini.user.default_user_resolver
```
````

````{py:function} display_name(user_id: str) -> str
:canonical: panelini.user.display_name

```{autodoc2-docstring} panelini.user.display_name
```
````

````{py:function} resolve_user(resolver: panelini.user.UserResolver | None = None) -> str
:canonical: panelini.user.resolve_user

```{autodoc2-docstring} panelini.user.resolve_user
```
````
