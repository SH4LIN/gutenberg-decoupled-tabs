/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useEffect, useRef, useState } from '@wordpress/element';
import {
	Button,
	PanelBody,
	__experimentalInputControl as InputControl, // eslint-disable-line @wordpress/no-unsafe-wp-apis
	ToolbarGroup, Modal, IconButton,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import './editor.scss';
import { TypeSelectorBlockControl, TabsSelectorDropDown, TabsSelectorList } from './components/selector-types';

/**
 * The edit function describes the structure of your block in the context of the editor.
 *
 * @param {Object}   root0               - Props
 * @param {Object}   root0.attributes    - Attributes
 * @param {Function} root0.setAttributes - Function to set attributes value.
 *
 * @return {JSX.Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const tabNameErrorRef = useRef( null );
	const tabCodeErrorRef = useRef( null );

	const [ tabNameValue, setTabNameValue ] = useState( '' );
	const [ tabCodeValue, setTabCodeValue ] = useState( '' );

	const [ isEditing, setIsEditing ] = useState( false );
	const [ tabToRemove, setTabToRemove ] = useState( '' );
	const [ tabToEdit, setTabToEdit ] = useState( '' );
	const [ isModalOpen, setIsModalOpen ] = useState( false );

	const {
		tabs,
		selectedTab,
		type,
		defaultTab,
	} = attributes;

	const blockProps = useBlockProps(
		{
			'data-selector-type': type,
		},
	);

	useEffect( () => {
		if ( tabs.length > 0 ) {
			if ( ! selectedTab ) {
				setAttributes( { selectedTab: tabs[ 0 ].id } );
			}

			if ( ! defaultTab ) {
				setAttributes( { defaultTab: tabs[ 0 ].id } );
			}
		}
	}, [ tabs ] ); // eslint-disable-line react-hooks/exhaustive-deps

	/**
	 * Add new tab to the list
	 *
	 * @return {void}
	 */
	const updateTab = () => {
		if ( ! tabNameErrorRef?.current || ! tabCodeErrorRef?.current ) {
			return;
		}

		let error = false;

		if ( '' === tabNameValue ) {
			tabNameErrorRef.current.textContent = __( 'Tab name is required', 'decoupled-tabs' );
			error = true;
		} else {
			tabNameErrorRef.current.textContent = '';
		}

		if ( '' === tabCodeValue ) {
			tabCodeErrorRef.current.textContent = __( 'Tab Code is required', 'decoupled-tabs' );
			error = true;
		} else {
			tabCodeErrorRef.current.textContent = '';
		}

		if ( error ) {
			return;
		}

		if ( tabs.find( ( tab ) => tab.id.toLowerCase() === tabCodeValue.toLowerCase() && tabCodeValue.toLowerCase() !== tabToEdit.toLowerCase() ) ) {
			tabCodeErrorRef.current.textContent = __( 'Tab Code already exists', 'decoupled-tabs' );
			return;
		}

		const name = tabNameValue;
		const id = tabCodeValue;

		const newTab = {
			oldId: isEditing ? tabToEdit : '',
			id,
			name,
			isEditing: false,
		};

		let newTabs;

		if ( isEditing ) {
			newTabs = tabs.map( ( tab ) => tab.id === tabToEdit ? newTab : tab );
			if ( defaultTab === tabToEdit ) {
				setAttributes( { defaultTab: id } );
			}

			if ( selectedTab === tabToEdit ) {
				setAttributes( { selectedTab: id } );
			}
		} else {
			newTabs = [ ...tabs, newTab ];
			setAttributes( { selectedTab: id } );
		}

		setAttributes( { tabs: newTabs } );

		if ( isEditing ) {
			setIsEditing( false );
			setTabToEdit( '' );
		}

		setTabNameValue( '' );
		setTabCodeValue( '' );
	};

	/**
	 * Display Warning Prompt
	 *
	 * @param {string} tabId
	 *
	 * @return {void}
	 */
	const displayWarningPrompt = ( tabId ) => {
		setTabToRemove( tabId );
		openModal();
	};

	/**
	 * Open Modal.
	 *
	 * @return {void}
	 */
	const openModal = () => setIsModalOpen( true );

	/**
	 * Close Modal.
	 *
	 * @return {void}
	 */
	const closeModal = () => setIsModalOpen( false );

	/**
	 * Remove Tab
	 *
	 * @return {void}
	 */
	const removeTab = () => {
		if ( tabToRemove ) {
			setAttributes(
				{
					tabs: tabs.filter( ( tab ) => tab.id !== tabToRemove ),
					defaultTab: defaultTab === tabToRemove ? '' : defaultTab,
					selectedTab: selectedTab === tabToRemove ? '' : selectedTab,
				},
			);
			setTabToRemove( '' );
		}
		closeModal();
	};

	/**
	 * Edit Tab.
	 *
	 * @param {string} tabId
	 *
	 * @return {void}
	 */
	const editTab = ( tabId ) => {
		const tabToModify = tabs.find( ( tab ) => tab.id === tabId );

		setTabNameValue( tabToModify.name );
		setTabCodeValue( tabToModify.id );

		setAttributes(
			{
				tabs: tabs.map(
					( tab ) => {
						if ( tab.id === tabId ) {
							return { ...tab, isEditing: true };
						}
						return { ...tab, isEditing: false };
					},
				),
			},
		);

		setIsEditing( true );
		setTabToEdit( tabId );
	};

	/**
	 * Display Tab specific actions.
	 *
	 * @return {JSX.Element} Tab Actions.
	 */
	const tabActions = () => {
		const currentTab = tabs.find( ( tab ) => tab.id === selectedTab );

		return (
			<div key={ currentTab.id } className={ `tab${ currentTab.isEditing ? ' is-editing' : '' }` }>
				<p className="tab-name">{ currentTab.name } { `(${ currentTab.id })` }</p>

				<div className="tab-actions">
					<IconButton
						icon="block-default"
						text={ __( 'Default', 'decoupled-tabs' ) }
						label={ __( 'Set as Default', 'decoupled-tabs' ) }
						onClick={ () => {
							setAttributes( { defaultTab: currentTab.id } );
						} }
						variant="primary"
						disabled={ currentTab.isEditing || currentTab.id === defaultTab }
					/>

					<IconButton
						icon="edit"
						variant="secondary"
						label={ __( 'Edit', 'decoupled-tabs' ) }
						onClick={ () => editTab( currentTab.id ) }
						disabled={ currentTab.isEditing }
					/>

					<IconButton
						icon="trash"
						onClick={ () => displayWarningPrompt( currentTab.id ) }
						label={ __( 'Delete', 'decoupled-tabs' ) }
						disabled={ currentTab.isEditing }
						isDestructive
					/>
				</div>
			</div>
		);
	};

	const Component = 'drop-down' === type ? TabsSelectorDropDown : TabsSelectorList;

	/**
	 * Empty List Component.
	 *
	 * @return {JSX.Element} Empty List Component.
	 */
	const EmptyListComponent = () => {
		return (
			<p>{ __( 'Please add tabs', 'decoupled-tabs' ) }</p>
		);
	};

	return (
		<>
			<BlockControls group="other">
				<ToolbarGroup>
					<TypeSelectorBlockControl type={ type } setAttributes={ setAttributes } />
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				<PanelBody className="tabs-selector-settings"
					title={ __( 'Tabs selector settings', 'decoupled-tabs' ) }>
					<InputControl
						value={ tabNameValue }
						onChange={ ( value ) => setTabNameValue( value ) }
						label={ __( 'Tab name', 'decoupled-tabs' ) } />
					<p ref={ tabNameErrorRef } className="error-text tab-name-error-text"></p>
					<InputControl
						value={ tabCodeValue }
						onChange={ ( value ) => setTabCodeValue( value ) }
						label={ __( 'Tab code', 'decoupled-tabs' ) } />
					<p ref={ tabCodeErrorRef } className="error-text tab-code-error-text"></p>
					{ (
						<Button
							onClick={ updateTab }
							isPrimary
						>
							{ isEditing ? __( 'Save', 'decoupled-tabs' ) : __( 'Add', 'decoupled-tabs' ) }
						</Button>
					) }

				</PanelBody>

				{
					selectedTab && (
						<PanelBody title={ __( 'Tab specific settings', 'decoupled-tabs' ) }>
							{ tabActions() }
						</PanelBody>
					)
				}

				<PanelBody title={ __( 'Tabs', 'decoupled-tabs' ) } initialOpen={ false } >
					{
						tabs.length < 1
							? (
								<p>{ __( 'No tab added', 'decoupled-tabs' ) }</p>
							) : (
								<div className="tabs-selector-list">
									{
										tabs.map( ( tab ) => (
											<div key={ tab.id } className={ `tab${ tab.isEditing ? ' is-editing' : '' }` }>
												<p className="tab-name">{ tab.name } { `(${ tab.id })` } { defaultTab === tab.id ? __( ' - Default', 'decoupled-tabs' ) : '' } </p>
											</div>
										) )
									}
								</div>
							)
					}
				</PanelBody>
			</InspectorControls>
			{
				isModalOpen && (
					<Modal title={ __( ' Warning', 'decoupled-tabs' ) } onRequestClose={ closeModal }>
						<p>{ __( 'Removing particular tab will also remove it\'s respective content from the page', 'decoupled-tabs' ) }</p>
						<p>{ __( 'Are you sure you want to remove this tab?', 'decoupled-tabs' ) }</p>
						<Button variant="secondary" onClick={ closeModal }>
							{ __( 'No', 'decoupled-tabs' ) }
						</Button>
						<Button isDestructive onClick={ removeTab }>
							{ __( 'Yes', 'decoupled-tabs' ) }
						</Button>
					</Modal>
				)
			}
			<div { ...blockProps }>
				{
					! tabs || tabs.length < 1
						? <EmptyListComponent /> : <Component attributes={ attributes } setAttributes={ setAttributes } />
				}
			</div>
		</>
	);
}
