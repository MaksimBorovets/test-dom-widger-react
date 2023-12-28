import React, { useState, useEffect } from 'react';

import './DOMTreeWidget.css';

export interface DOMNode {
  tagName: string;
  id: string;
  classList: string[];
  children: DOMNode[];
}

let uniqueIdCounter = 0;

const DOMTreeWidget: React.FC = () => {
  const [domTree, setDomTree] = useState<DOMNode[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const parseDOMNode = (node: Element): DOMNode => {
	if (node.classList.contains('dom-tree-widget')) {
	  return null;
	}
  
	return {
	  tagName: node.tagName,
	  id: node.id,
	  classList: Array.from(node.classList),
	  children: Array.from(node.children)
		.map(parseDOMNode)
		.filter((child) => child !== null),
	};
  };

  
  const highlightElement = (element: Element) => {
    document.querySelectorAll('.highlight').forEach((el) => {
      el.classList.remove('highlight');
    });
    element.classList.add('highlight');
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const onNodeClick = (e: React.MouseEvent, node: DOMNode) => {
    e.stopPropagation();

    let query = node.tagName.toLowerCase();

    if (node.id) {
      query += `#${node.id}`;
    } else if (node.classList.length) {
      query += node.classList.map((cls) => `.${cls}`).join('');
    }

    const elements = document.querySelectorAll(query);
    let elementToHighlight;

    elementToHighlight = elements[0];

    if (elementToHighlight) {
      highlightElement(elementToHighlight);
    }
  };

  const renderTreeNode = (node: DOMNode): JSX.Element => {
    const key = node.id
      ? `${node.tagName}-${node.id}`
      : `${node.tagName}-${Math.random()}`;

    return (
      <li key={key}>
        <span onClick={(e) => onNodeClick(e, node)}>
          TagName: {node.tagName.toUpperCase()}
          {node.id ? `#${node.id}` : ''}
        </span>
        {node.children.length > 0 && (
          <ul>{node.children.map(renderTreeNode)}</ul>
        )}
      </li>
    );
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tree = parseDOMNode(document.body);
      setDomTree([tree]);
    }
  }, []);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div
      id="tree-widget"
      className={`dom-tree-widget ${isVisible ? '' : 'hidden'}`}>
      <ul className="dom-tree-list">{domTree.map(renderTreeNode)}</ul>
      <div className="toggle-button" onClick={toggleVisibility}>
        {isVisible ? '>' : '<'}
      </div>
    </div>
  );
};

export default DOMTreeWidget;
