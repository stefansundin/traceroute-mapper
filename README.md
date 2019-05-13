# traceroute-mapper

Run it from your terminal:

### Linux

Put this in your `.bashrc`:

```bash
function traceroute-mapper {
  xdg-open "https://stefansundin.github.io/traceroute-mapper/?trace=$(traceroute -q1 $* | sed ':a;N;$!ba;s/\n/%0A/g')"
}
```

Then simply run: `traceroute-mapper google.com`


### Mac

Put this in your `.bash_profile`:

```bash
function traceroute-mapper {
  open "https://stefansundin.github.io/traceroute-mapper/?trace=$(traceroute -q1 $*)"
}
```

Then simply run: `traceroute-mapper google.com`


### Windows

Put [traceroute-mapper.bat](https://stefansundin.github.io/traceroute-mapper/traceroute-mapper.bat) in your `%PATH%` (e.g. `C:\Windows\`).

Then open cmd and run: `traceroute-mapper google.com`
