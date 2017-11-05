# -*- coding: utf-8 -*-
import scrapy
from scrapy.item import Item, Field
from scrapy.selector import Selector
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors.lxmlhtml import LxmlLinkExtractor
from scrapy import Request
from bs4 import BeautifulSoup
import requests
import csv
from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.contrib.linkextractors import LinkExtractor
import re
from scrapy.crawler import CrawlerProcess
import os


if os.path.exists('ParsedData.csv'):
	os.remove('ParsedData.csv')

f = csv.writer(open('ParsedData.csv' , 'w'))
f.writerow(['URL','Title','Subtitle','Description'])

class JavabotSpider(scrapy.Spider):
    name = 'javabot'
    allowed_domains = ['en.wikibooks.org']
    start_urls = ['https://en.wikibooks.org/wiki/Java_Programming']

    Rule(LinkExtractor(allow="en.wikibooks.org/wiki/", restrict_xpaths="//div[@class='mw-parser-output']//a"), callback='parse', follow=False)
    

    def page(self, response):
    	global f
    	URL = response.meta.get('URL')
    	title = response.meta.get('Title')

    	#print URL
    	page = requests.get(URL)

    	html_content = page.text
    	soup = BeautifulSoup(html_content,'lxml')
    	div = soup.findAll(['h2','h3','h4'])#,{"class" : "mw-parser-output"})
    	parser = {}
    	#first = false
    	h2 = ""
    	#print div
    	for section in div:
    		
    		if(section.span):
	    		subtitle = section.span.text
	    		nextNode = section
	    		paragraph = " "
	    		flag = True
	    		first = False
	    		while flag != False: 			
	    			nextNode = nextNode.nextSibling
	    			if nextNode != "\n":
		    			try:
		    				tag_name = nextNode.name
		    				#print tag_name
		    			except AttributeError:
		    				tag_name =""
		    			if tag_name == 'p' or tag_name == 'div' or tag_name == 'ul':
		    				#print nextNode.text
		    				paragraph = paragraph + (nextNode.text).encode("utf-8")


		       			else:
		       				# if(nextNode != '\n'):
		       				#f.writerow([URL,title,paragraph])
		       				
		       				#print '****'
		    				flag = False
		    				
		    				break
		    		else:
		    			continue
		    	#print subtitle
		    	#print paragraph
	    		f.writerow([URL,title,subtitle,paragraph])



    def parse(self, response):
    	shouldMatch = ['https://en.wikibooks.org/wiki/Java_Programming']
    	links = response.xpath('//li')
    	for link in links:
    		title = link.xpath('a/text()').extract_first()

    		if(title != 'None'):
    			relative_url = link.xpath('a/@href').extract_first()
    			absolute_url = response.urljoin(relative_url)
    			if re.search(shouldMatch[0],absolute_url):
    			#yield {'Title' : title, 'URL' : absolute_url} 
    				yield Request(absolute_url, callback = self.page, meta={'Title' : title, 'URL' : absolute_url})

class TutbotSpider(scrapy.Spider):
    name = 'tutbot'
    allowed_domains = ['docs.oracle.com']
    start_urls = ['https://docs.oracle.com/javase/tutorial/']

    Rule(LinkExtractor(allow=('^https://docs.oracle.com/javase/tutorial/', ), restrict_xpaths="//div[@id='TutBody']"), callback='parse', follow=False)
    

    def page(self, response):
    	global f
    	URL = response.meta.get('URL')
    	title = response.meta.get('Title')

    	#print URL
    	page = requests.get(URL)

    	html_content = page.text
    	soup = BeautifulSoup(html_content,'lxml')
    	div = soup.findAll(['p'])#,{"class" : "mw-parser-output"})
    	parser = {}
    	#first = false
    	#print div
    	for section in div:
    		if(section.a):
    			subtitle = (section.a.text).encode("utf-8")
    			paragraph = (section.text).encode("utf-8")
		    	#print subtitle
		    	#print paragraph
	    		f.writerow([URL,title,subtitle,paragraph])


    def parse(self, response):
    	shouldMatch = ['https://docs.oracle.com/javase/tutorial/']
    	links = response.xpath('//li')
    	for link in links:
    		
	    	title = link.xpath('a/text()').extract_first()

	    	if(title != 'None'):
	    		relative_url = link.xpath('a/@href').extract_first()
	    		absolute_url = response.urljoin(relative_url)
	    		if re.search(shouldMatch[0],absolute_url):
	    			#yield {'Title' : title, 'URL' : absolute_url} 
	    			yield Request(absolute_url, callback = self.page, meta={'Title' : title, 'URL' : absolute_url})

process = CrawlerProcess()

process.crawl(JavabotSpider)
process.crawl(TutbotSpider)
process.start()