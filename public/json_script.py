import json

def switch_tag_and_cluster(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    
    for node in data.get('nodes', []):
        if 'tag' in node and 'cluster' in node:
            node['tag'], node['cluster'] = node['cluster'], node['tag']
    
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)

file_path = 'dataset.json'
switch_tag_and_cluster(file_path)