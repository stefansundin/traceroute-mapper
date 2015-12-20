# traceroute-mapper

Run it from your terminal:

### Mac

Put this in your `.bash_profile`:

```bash
function traceroute-mapper {
  open "http://stefansundin.github.io/traceroute-mapper/?trace=$(traceroute -q1 $*)"
}
```

Then simply run: `traceroute-mapper google.com`

### Windows

Put [traceroute-mapper.bat](https://stefansundin.github.io/traceroute-mapper/traceroute-mapper.bat) in your `%PATH%` (e.g. `C:\Windows\`), and run `traceroute-mapper google.com` in cmd.
