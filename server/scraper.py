import requests
from bs4 import BeautifulSoup

def fun1(url):
    page = requests.get(url)

    soup = BeautifulSoup(page.content, "html.parser")

    result = soup.find_all("div", class_="highlight html")

    #https://realpython.com/beautiful-soup-web-scraper-python/

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

    print(result)
    return 0

fun1("https://realpython.com/beautiful-soup-web-scraper-python/")