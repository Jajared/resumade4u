import time
import numpy as np
import pandas as pd
from streamlit_option_menu import option_menu
from streamlit_extras.add_vertical_space import add_vertical_space
from selenium import webdriver
from selenium.webdriver.common.by import By
import warnings
warnings.filterwarnings('ignore')


class linkedin_scrap:

    def linkedin_open_scrolldown(driver, job_tags):

        b = []
        for i in job_tags:
            x = i.split()
            y = '%20'.join(x)
            b.append(y)
        job_title = '%2C%20'.join(b)

        link = f"https://linkedin.com/jobs/search?keywords={job_title}&location=Singapore&position=1&pageNum=0"
        driver.get(link)
        driver.implicitly_wait(10)

    def company_name(driver):

        company = driver.find_elements(
            by=By.CSS_SELECTOR, value='h4[class="base-search-card__subtitle"]')

        company_name = []

        for i in company:
            company_name.append(i.text)

        return company_name

    def company_location(driver):

        location = driver.find_elements(
            by=By.CSS_SELECTOR, value='span[class="job-search-card__location"]')

        company_location = []

        for i in location:
            company_location.append(i.text)

        return company_location

    def job_title(driver):
        title = driver.find_elements(
            by=By.CSS_SELECTOR, value='h3[class="base-search-card__title"]')
        job_title = []

        for i in title:
            job_title.append(i.text)
        return job_title

    def job_url(driver):
        url = driver.find_elements(
            by=By.XPATH, value='//a[contains(@href, "/jobs/")]')

        url_list = [i.get_attribute('href') for i in url]

        job_url = []

        for url in url_list:
            job_url.append(url)

        return job_url

    def job_title_filter(x, user_job_title):
        s = [i.lower() for i in user_job_title]
        suggestion = []
        for i in s:
            suggestion.extend(i.split())
        s = x.split()
        a = [i.lower() for i in s]

        intersection = list(set(suggestion).intersection(set(a)))
        return x if len(intersection) > 1 else np.nan

    def get_description(driver, link):

        driver.get(link)
        time.sleep(3)
        description = driver.find_elements(by=By.CSS_SELECTOR,
                                           value='div[class="show-more-less-html__markup relative overflow-hidden"]')
        driver.implicitly_wait(4)
        for j in description:
            return j.text

    def image_url(driver):
        driver.implicitly_wait(10)
        image_elements = driver.find_elements(
            By.XPATH, '//img[contains(@class, "artdeco-entity-image")]')
        image_elements_list = [image_element.get_attribute(
            'src') or image_element.get_attribute('data-delayed-url') for image_element in image_elements]
        image_urls = []
        for image_element in image_elements_list:
            image_urls.append(image_element)
        return image_urls

    def data_scrap(driver):

        df = pd.DataFrame()
        df['Company Name'] = linkedin_scrap.company_name(driver)
        df['Job Title'] = linkedin_scrap.job_title(driver)
        df['Location'] = linkedin_scrap.company_location(driver)
        df['Website URL'] = linkedin_scrap.job_url(driver)[:len(df)]
        df['Image URL'] = linkedin_scrap.image_url(driver)[:len(df)]

        return df

    def main(user_job_title):
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--maximize-window')
        driver = webdriver.Chrome(options=chrome_options)

        linkedin_scrap.linkedin_open_scrolldown(driver, user_job_title)

        final_df = linkedin_scrap.data_scrap(driver)

        driver.quit()

        return final_df
