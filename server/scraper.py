import requests
from bs4 import BeautifulSoup

def scrape(term):
    page = requests.get(f"https://www.zdic.net/hans/{term}")

    soup = BeautifulSoup(page.content, "html.parser")

    result = soup.find_all("div", {"class": "jnr"})

    for r in result:
        print(r.prettify())
    if result:
        print("success")
        return [r.prettify() for r in result]
    else:
        print("invalid word")
        return "<p>Invalid Word!</p>"

