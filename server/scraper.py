import requests
from bs4 import BeautifulSoup

def scrape(term):
    page = requests.get(f"https://www.zdic.net/hans/{term}")

    soup = BeautifulSoup(page.content, "html.parser")

    result = soup.find_all("div", {"class": "jnr"})


    # for job_element in job_elements:
    #     print(job_element, end="\n"*2)
    # for job_element in job_elements:
    #     title_element = job_element.find("h2", class_="title")
    #     company_element = job_element.find("h3", class_="company")
    #     location_element = job_element.find("p", class_="location")
    #     print(title_element.text.strip())
    #     print(company_element)
    #     print(location_element)
    #     print()
    for r in result:
        print(r.prettify())
    if result:
        print("success")
        return [r.prettify() for r in result]
    else:
        print("invalid word")
        return "<p>Invalid Word!</p>"

