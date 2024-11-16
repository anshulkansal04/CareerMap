from googlesearch import search
import json
import asyncio
from playwright.async_api import async_playwright

async def fetch_scholarships(query):
    base_url = "https://www.buddy4study.com/scholarships"
    search_url = f"{base_url}?q={query.replace(' ', '%20')}"

    scholarships = []
    MAX_ENTRIES = 5

    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            await page.goto(search_url)

            await page.wait_for_selector("a.Listing_categoriesBox__CiGvQ")

            cards = await page.query_selector_all("a.Listing_categoriesBox__CiGvQ")

            for card in cards:
                if len(scholarships) >= MAX_ENTRIES:
                    break

                try:
                    name = await card.query_selector("h4.Listing_scholarshipName__VLFMj p")
                    name_text = await name.inner_text() if name else "Not Available"

                    last_date = await card.query_selector("div.Listing_calendarDate__WCgKV p:last-child")
                    last_date_text = await last_date.inner_text() if last_date else "Not Available"

                    award = await card.query_selector("h4:text('Award') + p")
                    award_text = await award.inner_text() if award else "Not Available"

                    elig = await card.query_selector("h4:text('Eligibility') + p")
                    elig_text = await elig.inner_text() if elig else "Not Available"

                    scholarship_link = get_google_search_link(name_text)

                    scholarships.append({
                        "Name": name_text.strip(),
                        "Last Date to Apply": last_date_text.strip(),
                        "Award": award_text.strip(),
                        "Eligibility": elig_text.strip(),
                        "Link": scholarship_link
                    })
                except Exception as e:
                    print(f"Error processing card: {e}")
                    continue

            await browser.close()

        with open('scholarships.json', 'w', encoding='utf-8') as file:
            json.dump(scholarships, file, indent=4, ensure_ascii=False)

        print(f"Scholarship data saved to scholarships_with_links.json with {len(scholarships)} entries.")
    except Exception as e:
        print(f"An error occurred: {e}")

def get_google_search_link(query):
    try:
        search_results = search(query, num=1)
        first_link = next(search_results, None)
        return first_link if first_link else "Link Not Found"
    except Exception as e:
        print(f"Error during Google search for '{query}': {e}")
        return "Link Not Found"

query = input("Enter your query: ")
task = asyncio.create_task(fetch_scholarships(query))


# from flask import Flask, request, jsonify
# from googlesearch import search
# import asyncio
# from playwright.async_api import async_playwright

# app = Flask(__name__)

# async def scrape_scholarships(query):
#     base_url = "https://www.buddy4study.com/scholarships"
#     search_url = f"{base_url}?q={query.replace(' ', '%20')}"

#     scholarships = []
#     MAX_ENTRIES = 7

#     try:
#         async with async_playwright() as p:
#             browser = await p.chromium.launch(headless=True)
#             page = await browser.new_page()
#             await page.goto(search_url)

#             await page.wait_for_selector("a.Listing_categoriesBox__CiGvQ")

#             cards = await page.query_selector_all("a.Listing_categoriesBox__CiGvQ")

#             for card in cards:
#                 if len(scholarships) >= MAX_ENTRIES:
#                     break

#                 try:
#                     name_element = await card.query_selector("h4.Listing_scholarshipName__VLFMj p")
#                     name = await name_element.inner_text() if name_element else "Not Available"

#                     last_date_element = await card.query_selector("div.Listing_calendarDate__WCgKV p:last-child")
#                     last_date = await last_date_element.inner_text() if last_date_element else "Not Available"

#                     award_element = await card.query_selector("h4:text('Award') + p")
#                     award = await award_element.inner_text() if award_element else "Not Available"

#                     eligibility_element = await card.query_selector("h4:text('Eligibility') + p")
#                     eligibility = await eligibility_element.inner_text() if eligibility_element else "Not Available"

#                     scholarship_link = get_google_search_link(name)

#                     scholarships.append({
#                         "Name": name.strip(),
#                         "Last Date to Apply": last_date.strip(),
#                         "Award": award.strip(),
#                         "Eligibility": eligibility.strip(),
#                         "Link": scholarship_link
#                     })
#                 except Exception as e:
#                     print(f"Error processing card: {e}")
#                     continue

#             await browser.close()

#         return scholarships
#     except Exception as e:
#         print(f"Error during scraping: {e}")
#         return []

# def get_google_search_link(query):
#     try:
#         search_results = search(query, num=1, stop=1)
#         return next(search_results, "Link Not Found")
#     except Exception as e:
#         print(f"Error during Google search: {e}")
#         return "Link Not Found"

# @app.route('/fetch-scholarships', methods=['GET'])
# def fetch_scholarships():
#     query = request.args.get('query', default='', type=str)
#     if not query:
#         return jsonify({"error": "Query parameter is required"}), 400

#     loop = asyncio.new_event_loop()
#     asyncio.set_event_loop(loop)
#     scholarships = loop.run_until_complete(scrape_scholarships(query))
#     return jsonify(scholarships)

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000)