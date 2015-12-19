# traceroute-mapper

Run it from your terminal:

### Mac

Put this in your `.bash_profile`:

```bash
function traceroute-mapper {
  open "https://stefansundin.github.io/traceroute-mapper/?trace=$(traceroute -q1 $*)"
}
```

Then simply run: `traceroute-mapper google.com`
