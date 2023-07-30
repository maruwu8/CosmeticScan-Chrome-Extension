import requests
from bs4 import BeautifulSoup
import json
import sys
import re

# Function to scrape the ingredients from a Notino product page
def scrape_ingredients(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    
    composition_div = soup.find("div", id="pd-composition-wrapper")

    if composition_div is None:
        print("Ingredient information not found.")
        return []

    ingredient_paragraph = composition_div.find_all("p")[2]

    ingredient_text = ingredient_paragraph.get_text(strip=True)
    ingredients = re.split(r'[\.,]', ingredient_text)
    ingredients = [ingredient.strip() for ingredient in ingredients if ingredient.strip()]

    return ingredients

def scrape_name(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    name_div = soup.find("a", class_="sc-3sotvb-2 iYvTNX")

    # Extract the brand name and product name
    brand_name = name_div.get_text(strip=True)
    product_name = name_div.find_next_sibling("span").get_text(strip=True)

    full_product_name = f"{brand_name} {product_name}"

    return full_product_name
 
def scrape_category(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    category_div = soup.find_all("a", class_="styled__BreadcrumbLink-sc-caahyp-3 hkSSHC")

    category_name = category_div[-1].get_text(strip=True)

    return category_name

# Get the URL from the command line arguments
url = sys.argv[1]

ingredients_data = scrape_ingredients(url)
name_data = scrape_name(url)
category_data = scrape_category(url)

# Create a dictionary to store the scraped data
scraped_data = {
    "ingredients": ingredients_data,
    "name": name_data,
    "category": category_data
}

# Convert the dictionary to JSON string
scraped_data_json = json.dumps(scraped_data)

print(scraped_data_json)